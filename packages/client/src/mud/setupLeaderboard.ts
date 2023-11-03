import { resourceToHex } from "@latticexyz/common";
import { setupNetwork } from "./setupNetwork";

import mudConfig from "contracts/mud.config";

export type SetupResult = Awaited<ReturnType<typeof setupLeaderboard>>;

const FILTERS = [
  {
    tableId: resourceToHex({
      type: "table",
      namespace: mudConfig.namespace,
      name: "Balances",
    }),
  },
];

export async function setupLeaderboard() {
  const network = await setupNetwork(FILTERS);

  return {
    network,
  };
}
