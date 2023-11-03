import { resourceToHex } from "@latticexyz/common";
import { setupNetwork } from "./setupNetwork";

import skystrifeConfig from "contracts-skystrife/mud.config";
import { SyncFilter } from "@latticexyz/store-sync";

export type SetupResult = Awaited<ReturnType<typeof setupApp>>;

const FILTERS: SyncFilter[] = [
  {
    tableId: resourceToHex({
      type: "table",
      namespace: skystrifeConfig.namespace,
      name: "MatchConfig",
    }),
  },
];

export async function setupHome() {
  const network = await setupNetwork(FILTERS);
  return {
    network,
  };
}
