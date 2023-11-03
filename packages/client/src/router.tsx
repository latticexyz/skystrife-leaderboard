import { createBrowserRouter, useParams } from "react-router-dom";
import { Setup } from "./Setup";
import { Leaderboard } from "./Leaderboard";
import { Match } from "./Match";
import { setup } from "./mud/setup";
import { Hex } from "viem";
import { Home } from "./Home";
import {
  FILTERS_HOME,
  FILTERS_LEADERBOARD,
  getFiltersMatch,
} from "./mud/filters";

const SetupMatch = () => {
  const { matchEntity } = useParams();

  return (
    <Setup mySetup={() => setup(getFiltersMatch(matchEntity as Hex))}>
      <Match />
    </Setup>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Setup mySetup={() => setup(FILTERS_HOME)}>
        <Home />
      </Setup>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <Setup mySetup={() => setup(FILTERS_LEADERBOARD)}>
        <Leaderboard />
      </Setup>
    ),
  },
  {
    path: "/match/:matchEntity",
    element: <SetupMatch />,
  },
]);
