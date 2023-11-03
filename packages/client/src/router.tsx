import { createBrowserRouter } from "react-router-dom";
import { SetupApp } from "./SetupApp";
import { SetupLeaderboard } from "./SetupLeaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SetupLeaderboard />,
  },
  {
    path: "/match",
    element: <SetupApp />,
  },
]);
