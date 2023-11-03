import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");

const root = ReactDOM.createRoot(rootElement);
root.render(<RouterProvider router={router} />);
