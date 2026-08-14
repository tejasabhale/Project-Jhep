import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Landing/Home";

const HomeRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Home />;
  }

  return (
    <Navigate to={user?.role === "admin" ? "/admin" : "/content"} replace />
  );
};

export default HomeRoute;
