import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/sidebar/AdminSidebar";
import AdminHeader from "../components/admin/header/AdminHeader";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  // Keep desktop/mobile initial state in sync if window resizes across breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background font-sans text-text-primary">
      {/* Sidebar (Desktop persistent collapsible / Mobile drawer) */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex min-h-screen flex-col transition-[padding] duration-200 ease-in-out ${
          sidebarOpen ? "lg:pl-[260px]" : "lg:pl-0"
        }`}
      >
        {/* Persistent Top Header */}
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Dynamic Route Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
