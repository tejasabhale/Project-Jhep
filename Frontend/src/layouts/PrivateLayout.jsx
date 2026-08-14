import { Outlet } from "react-router-dom";
import Footer from "../components/pageLayout/Footer";
import AppNavbar from "../components/pageLayout/AppNavbar";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <AppNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PrivateLayout;
