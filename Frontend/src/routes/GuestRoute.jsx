import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const GuestRoute = () => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return (
      <Navigate to={user?.role === "admin" ? "/admin" : "/topics"} replace />
    );
  }

  return <Outlet />;
};

export default GuestRoute;
