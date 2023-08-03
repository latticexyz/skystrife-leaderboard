import { createClientComponents } from "./createClientComponents";
import { setupNetwork } from "./setupNetwork";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup() {
  const network = await setupNetwork();
  const components = createClientComponents(network);
  return {
    network,
    components,
  };
}
