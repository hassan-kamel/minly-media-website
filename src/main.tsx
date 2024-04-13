import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/appStore.ts";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import SignUpPage from "./pages/SignupPage.tsx";
import GuestRoute from "./components/GuestRoute.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        index: true,
        errorElement: <ErrorPage />,
        element: <Home />,
      },
      {
        path: "login",
        errorElement: <ErrorPage />,
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: "SignUp",
        errorElement: <ErrorPage />,
        element: (
          <GuestRoute>
            <SignUpPage />
          </GuestRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
