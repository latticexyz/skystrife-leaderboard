import ReactDOM from "react-dom/client";
import { mount as mountDevTools } from "@latticexyz/dev-tools";
import { App } from "./App";
import { setup } from "./mud/setup";
import { MUDProvider } from "./MUDContext";
import mudConfig from "./mud/skystrife-config/mud.config";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <div className="bg-slate-200 min-h-screen h-fit">
    <div className="p-8">Loading...</div>
  </div>
);

// TODO: figure out if we actually want this to be async or if we should render something else in the meantime
setup().then((result) => {
  root.render(
    <MUDProvider value={result}>
      <App />
    </MUDProvider>
  );
  mountDevTools({
    config: mudConfig,
    publicClient: result.network.publicClient,
    walletClient: result.network.walletClient,
    latestBlock$: result.network.latestBlock$,
    blockStorageOperations$: result.network.blockStorageOperations$,
    worldAddress: result.network.worldContract.address,
    worldAbi: result.network.worldContract.abi,
    write$: result.network.write$,
    recsWorld: result.network.world,
  });
});
