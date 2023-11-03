import { createBrowserRouter, useParams } from "react-router-dom";
import { Setup } from "./Setup";
import { Leaderboard } from "./Leaderboard";
import { Match } from "./Match";
import { setupLeaderboard } from "./mud/setupLeaderboard";
import { setupApp } from "./mud/setupApp";
import { Hex } from "viem";
import { Home } from "./Home";
import { setupHome } from "./mud/setupHome";

const SetupApp = () => {
  const { matchEntity } = useParams();

  return (
    <Setup setup={() => setupApp(matchEntity as Hex)}>
      <Match />
    </Setup>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Setup setup={setupHome}>
        <Home />
      </Setup>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <Setup setup={setupLeaderboard}>
        <Leaderboard />
      </Setup>
    ),
  },
  {
    path: "/match/:matchEntity",
    element: <SetupApp />,
  },
]);
