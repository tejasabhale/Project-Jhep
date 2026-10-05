import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Landing/Home";

const HomeRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Home />;
  }

  const destination =
    user?.role === "content_creator"
      ? "/admin/topics/manage"
      : ["admin", "owner"].includes(user?.role)
      ? "/admin"
      : "/content";

  return <Navigate to={destination} replace />;
};

export default HomeRoute;
