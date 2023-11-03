import { resourceToHex } from "@latticexyz/common";
import { setupNetwork } from "./setupNetwork";

import mudConfig from "contracts/mud.config";
import skystrifeConfig from "contracts-skystrife/mud.config";
import { Hex } from "viem";
import { SyncFilter } from "@latticexyz/store-sync";

export type SetupResult = Awaited<ReturnType<typeof setupApp>>;

const createSyncFilters = (matchEntity: Hex): SyncFilter[] => [
  // Root tables
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "MatchConfig",
    }),
  },
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "LevelContent",
    }),
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
    key0: matchEntity,
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
      name: "Balances",
    }),
  },
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
];

export async function setupApp(matchEntity: Hex) {
  const network = await setupNetwork(createSyncFilters(matchEntity));
  return {
    network,
  };
}
