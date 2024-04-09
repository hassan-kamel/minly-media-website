import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  // user
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return { children };
};

export default AuthenticatedRoute;
