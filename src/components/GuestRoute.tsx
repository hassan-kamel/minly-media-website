import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  // user
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default GuestRoute;
