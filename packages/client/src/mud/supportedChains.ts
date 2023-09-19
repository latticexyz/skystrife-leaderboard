import { MUDChain, latticeTestnet, mudFoundry } from "@latticexyz/common/chains";

type SkyStrifeChain = MUDChain & {
    indexerUrl?: string;
};

export const latticeTestnet2 = {
    name: "Lattice Testnet 2",
    id: 4243,
    network: "lattice-testnet2",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: {
        default: {
            http: ["https://follower.testnet2-chain.linfra.xyz"],
            webSocket: ["wss://follower.testnet2-chain.linfra.xyz"],
        },
        public: {
            http: ["https://follower.testnet2-chain.linfra.xyz"],
            webSocket: ["wss://follower.testnet2-chain.linfra.xyz"],
        },
    },
    blockExplorers: {
        otterscan: {
            name: "Otterscan",
            url: "https://explorer.testnet2-chain.linfra.xyz",
        },
        default: {
            name: "Otterscan",
            url: "https://explorer.testnet2-chain.linfra.xyz",
        },
    },
    faucetUrl: "https://faucet.testnet2-mud-services.linfra.xyz",
    indexerUrl: "https://indexer.testnet2-mud-services.linfra.xyz/trpc",
} as const satisfies SkyStrifeChain;

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
    faucetUrl: "https://faucet.redstone.linfra.xyz",
    indexerUrl: "https://indexer.redstone.linfra.xyz/trpc",
} as const satisfies SkyStrifeChain;

// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: SkyStrifeChain[] = [mudFoundry, latticeTestnet, latticeTestnet2, redstone];
