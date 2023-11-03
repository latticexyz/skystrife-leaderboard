import { Hex, PublicClient, parseEther } from "viem";
import { createClient as createFaucetClient } from "@latticexyz/faucet";

export function drip(address: Hex, faucetServiceUrl: string, publicClient: PublicClient) {
  console.info("[Dev Faucet]: Player address -> ", address);

  try {
    console.log("creating faucet client");
    const faucet = createFaucetClient({ url: faucetServiceUrl });

    const doDrip = async () => {
      const balance = await publicClient.getBalance({ address });
      console.info(`[Dev Faucet]: Player balance -> ${balance}`);

      if (balance < parseEther("1")) {
        console.log("dripping");
        const tx = await faucet.drip.mutate({ address });
        console.log("got drip", tx);
      }
    };

    doDrip();
    setInterval(doDrip, 20_000);
  } catch (e) {
    console.error(e);
  }
}
