import { useEffect, useState } from "react";
import { MUDProvider } from "./MUDContext";
import { App } from "./App";
import { setup } from "./mud/setup";

export function SetupApp() {
  const [result, setResult] = useState<Awaited<ReturnType<typeof setup>>>();

  useEffect(() => {
    setup().then((res) => setResult(res));
  }, []);

  return (
    <div>
      {result ? (
        <MUDProvider value={result}>
          <App />
        </MUDProvider>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
