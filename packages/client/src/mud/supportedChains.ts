import { MUDChain, mudFoundry } from "@latticexyz/common/chains";

type SkyStrifeChain = MUDChain & {
    indexerUrl?: string;
};

export const redstone = {
    name: "Redstone Testnet",
    id: 901,
    network: "redstone-testnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: {
        default: {
            http: ["https://redstone.linfra.xyz"],
            webSocket: ["wss://redstone.linfra.xyz/ws"],
        },
        public: {
            http: ["https://redstone.linfra.xyz"],
            webSocket: ["wss://redstone.linfra.xyz/ws"],
        },
    },
    blockExplorers: {
        blockscout: {
            name: "Blockscout",
            url: "https://explorer.redstone.linfra.xyz",
        },
        default: {
            name: "Blockscout",
            url: "https://explorer.redstone.linfra.xyz",
        },
    },
    faucetUrl: "https://faucet.redstone.linfra.xyz/trpc",
    indexerUrl: "https://indexer.redstone.linfra.xyz/trpc",
} as const satisfies SkyStrifeChain;

// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: SkyStrifeChain[] = [mudFoundry, redstone];
