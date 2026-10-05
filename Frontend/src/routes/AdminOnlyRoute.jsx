import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const AdminOnlyRoute = () => {
  const { loading, user } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "content_creator") {
    return <Navigate to="/admin/topics/manage" replace />;
  }

  if (user.role === "user") {
    return <Navigate to="/content" replace />;
  }

  return <Outlet />;
};

export default AdminOnlyRoute;
