import React from "react";
import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default GuestLayout;
