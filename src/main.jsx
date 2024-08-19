import { StrictMode } from "react";
import Dashboard from "./Dashboard.jsx";
import Highlight from "./Highlight.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

const router = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/highlight",
    element: <Highlight />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
