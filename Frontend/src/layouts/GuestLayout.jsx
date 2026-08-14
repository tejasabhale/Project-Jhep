import React from "react";
import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Outlet />
    </div>
  );
}

export default GuestLayout;
