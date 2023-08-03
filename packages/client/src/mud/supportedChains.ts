import { MUDChain, latticeTestnet } from "@latticexyz/common/chains";
import { foundry } from "viem/chains";

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
    modeUrl: "https://mode.testnet2-mud-services.linfra.xyz",
    faucetUrl: "https://faucet.testnet2-mud-services.linfra.xyz",
} as const satisfies MUDChain;

// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: MUDChain[] = [foundry, latticeTestnet, latticeTestnet2];
