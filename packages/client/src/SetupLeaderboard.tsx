import { useEffect, useState } from "react";
import { MUDProvider } from "./MUDContext";
import { Leaderboard } from "./Leaderboard";
import { setup } from "./mud/setupLeaderboard";

export function SetupLeaderboard() {
  const [result, setResult] = useState<Awaited<ReturnType<typeof setup>>>();

  useEffect(() => {
    setup().then((res) => setResult(res));
  }, []);

  return (
    <div>
      {result ? (
        <MUDProvider value={result}>
          <Leaderboard />
        </MUDProvider>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
