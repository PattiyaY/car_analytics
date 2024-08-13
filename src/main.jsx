import { StrictMode } from "react";
import Dashboard from "./Dashboard.jsx";
import Highlight from "./Highlight.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // Default path: "/"
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/highlight",
    element: <Highlight />,
  },

]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
