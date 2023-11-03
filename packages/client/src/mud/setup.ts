import { setupNetwork } from "./setupNetwork";
import { SyncFilter } from "@latticexyz/store-sync";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup(filters: SyncFilter[]) {
  const network = await setupNetwork(filters);
  return {
    network,
  };
}
