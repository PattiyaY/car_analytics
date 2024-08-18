import { StrictMode } from "react";
import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import Highlight from "./Highlight.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  // Default path: "/"
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  // },
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
