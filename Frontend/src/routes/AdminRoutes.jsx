import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const AdminRoutes = () => {
  const { loading, user } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role == "user") {
    return <Navigate to="/topics" replace />;
  }

  return <Outlet />;
};

export default AdminRoutes;
