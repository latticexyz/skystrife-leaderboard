/*
 * The MUD client code is built on top of viem
 * (https://viem.sh/docs/getting-started.html).
 * This line imports the functions we need from it.
 */
import {
  createPublicClient,
  fallback,
  webSocket,
  http,
  createWalletClient,
  Hex,
  parseEther,
  ClientConfig,
} from "viem";
import { syncToZustand } from "@latticexyz/store-sync/zustand";
import { resolveConfig } from "@latticexyz/store";

import { getNetworkConfig } from "./getNetworkConfig";
import SkystrifeAbi from "contracts-skystrife/out/world/IWorld.sol/IWorld.abi.json";
import IWorldAbi from "contracts/out/world/IWorld.sol/IWorld.abi.json";
import {
  createBurnerAccount,
  createContract,
  transportObserver,
  ContractWrite,
  resourceToHex,
} from "@latticexyz/common";

import { Subject, share } from "rxjs";

/*
 * Import our MUD config, which includes strong types for
 * our tables and other config options. We use this to generate
 * things like RECS components and get back strong types for them.
 *
 * See https://mud.dev/tutorials/walkthrough/minimal-onchain#mudconfigts
 * for the source of this information.
 */
import skystrifeConfig from "contracts-skystrife/mud.config";
import mudConfig from "contracts/mud.config";
import { SyncFilter } from "@latticexyz/store-sync";
import { drip } from "./faucet";

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

const createSyncFilters = (matchEntity: Hex): SyncFilter[] => [
  // Root tables
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "MatchConfig",
    })
  },
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "LevelContent",
    })
  },
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "Position",
    }),
    key0: matchEntity,
  },
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "OwnedBy",
    }),
    key0: matchEntity
  },
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "StructureType",
    }),
    key0: matchEntity,
  },
  // Sky Scavenger tables
  {
    tableId: resourceToHex({
      type: "table",
      namespace: mudConfig.namespace,
      name: "Position",
    }),
    key0: matchEntity,
  },
  {
    tableId: resourceToHex({
      type: "table",
      namespace: mudConfig.namespace,
      name: "Pilfered",
    }),
    key0: matchEntity,
  },
  {
    tableId: resourceToHex({
      type: "table",
      namespace: mudConfig.namespace,
      name: "Balances",
    })
  }
];

export async function setupNetwork() {
  const networkConfig = await getNetworkConfig();

  /*
   * Create a viem public (read only) client
   * (https://viem.sh/docs/clients/public.html)
   */
  const clientOptions = {
    chain: networkConfig.chain,
    transport: transportObserver(fallback([webSocket(), http()])),
    pollingInterval: 1000,
  } as const satisfies ClientConfig;

  const publicClient = createPublicClient(clientOptions);

  /*
   * Create a temporary wallet and a viem client for it
   * (see https://viem.sh/docs/clients/wallet.html).
   */
  const account = createBurnerAccount(networkConfig.privateKey as Hex);
  const walletClient = createWalletClient({
    ...clientOptions,
    account,
  });

  /*
   * Create an observable for contract writes that we can
   * pass into MUD dev tools for transaction observability.
   */
  const write$ = new Subject<ContractWrite>();

  /*
   * Create an object for communicating with the deployed World.
   */
  const worldContract = createContract({
    address: networkConfig.worldAddress as Hex,
    abi: [
      ...SkystrifeAbi,
      ...IWorldAbi
    ] as const,
    publicClient,
    walletClient,
    onWrite: (write) => write$.next(write),
  });

  const { tables: scavengerTables } = resolveConfig(mudConfig);

  /*
   * Sync on-chain state into RECS and keeps our client in sync.
   * Uses the MUD indexer if available, otherwise falls back
   * to the viem publicClient to make RPC calls to fetch MUD
   * events from the chain.
   */
  const { tables, useStore, latestBlock$, storedBlockLogs$ } = await syncToZustand({
    config: skystrifeConfig,
    address: networkConfig.worldAddress as Hex,
    publicClient,
    indexerUrl: networkConfig.indexerUrl,
    startBlock: BigInt(networkConfig.initialBlockNumber),
    filters: createSyncFilters(networkConfig.matchEntity),
    tables: {
      Pilfered: scavengerTables.Pilfered,
      ScavengerPosition: scavengerTables.Position,
      ScavengerBalances: scavengerTables.Balances
    }
  });

  /*
   * If there is a faucet, request (test) ETH if you have
   * less than 1 ETH. Repeat every 20 seconds to ensure you don't
   * run out.
   */
  if (networkConfig.faucetServiceUrl) {
    const { address } = account;
    console.info("[Dev Faucet]: Player address -> ", address);


    const requestDrip = async () => {
      const balance = await publicClient.getBalance({ address });
      console.info(`[Dev Faucet]: Player balance -> ${balance}`);
      const lowBalance = balance < parseEther("1");
      if (lowBalance && networkConfig.faucetServiceUrl) {
        console.info("[Dev Faucet]: Balance is low, dripping funds to player");
        // Double drip
        drip(address, networkConfig.faucetServiceUrl, publicClient);
      }
    };

    requestDrip();
    // Request a drip every 20 seconds
    setInterval(requestDrip, 20000);
  }

  return {
    tables,
    useStore,
    publicClient,
    walletClient,
    latestBlock$,
    storedBlockLogs$,
    worldContract,
    write$: write$.asObservable().pipe(share()),
    matchEntity: networkConfig.matchEntity
  };
}
