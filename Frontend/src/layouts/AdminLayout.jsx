import { Outlet } from "react-router-dom";
import AppNavbar from "../components/pageLayout/AppNavbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AppNavbar />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
