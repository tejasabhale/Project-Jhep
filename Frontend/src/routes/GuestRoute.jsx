import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const GuestRoute = () => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    const destination =
      user?.role === "content_creator"
        ? "/admin/topics/manage"
        : ["admin", "owner"].includes(user?.role)
        ? "/admin"
        : "/content";
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
