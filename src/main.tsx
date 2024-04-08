import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import SignUpPage from "./pages/SignupPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "login",
    errorElement: <ErrorPage />,
    element: <LoginPage />,
  },
  {
    path: "SignUp",
    errorElement: <ErrorPage />,
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
