import { setupNetwork } from "./setupNetworkLeaderboard";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup() {
  const network = await setupNetwork();
  return {
    network,
  };
}
