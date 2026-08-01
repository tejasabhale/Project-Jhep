import { Outlet } from "react-router-dom";
import AppNavbar from "../components/pageLayout/AppNavbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-orange-50">
      {/* <Sidebar /> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
