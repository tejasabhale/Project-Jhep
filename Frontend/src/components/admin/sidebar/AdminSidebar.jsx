import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { X, LogOut, Shield } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import {
  adminMenuSections,
  adminUtilityItems,
} from "../../../config/adminMenu";

/* Slim scrollbar for the dark sidebar. Hidden until the menu is hovered. */
const scrollbarStyles = `
.admin-sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.2s ease;
}
.admin-sidebar-scroll:hover {
  scrollbar-color: rgb(255 255 255 / 0.28) transparent;
}
.admin-sidebar-scroll::-webkit-scrollbar {
  width: 6px;
}
.admin-sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.admin-sidebar-scroll::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 999px;
}
.admin-sidebar-scroll:hover::-webkit-scrollbar-thumb {
  background: rgb(255 255 255 / 0.28);
}
`;

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && open) {
      onClose?.();
    }
  }, [location.pathname]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleLogout = async () => {
    await logout();
    onClose?.();
    navigate("/");
  };

  const initials = (user?.fullName || user?.userName || user?.email || "A")
    .charAt(0)
    .toUpperCase();

  const filteredSections = adminMenuSections
    .filter((section) => !section.roles || section.roles.includes(user?.role))
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.roles || item.roles.includes(user?.role)
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      <style>{scrollbarStyles}</style>

      {/* Mobile Backdrop */}
      {open && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close admin menu"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClose?.();
            }
          }}
          className="fixed inset-0 z-40 bg-secondary-dark/60 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/10 bg-[#142b38] transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-15 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <button
            type="button"
            onClick={() => {
              navigate(user?.role === "content_creator" ? "/admin/topics/manage" : "/admin");

              if (window.innerWidth < 1024) {
                onClose?.();
              }
            }}
            className="flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs">
              <img
                src="/logo.svg"
                alt="Project Jhep"
                className="h-6 w-6 object-contain"
              />
            </div>

            <div>
              <p className="font-display text-base font-bold leading-none tracking-tight text-white">
                Project <span className="text-primary">Jhep</span>
              </p>

              <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                {user?.role === "content_creator" ? "Content Studio" : "Admin Panel"}
              </p>
            </div>
          </button>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white/10 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="mx-3.5 mt-3.5 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-white shadow-xs">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-xs font-bold text-white">
                {user?.fullName || user?.userName || "Admin"}
              </p>

              <p className="flex items-center gap-1 font-sans text-[11px] text-white">
                <Shield size={10} className="text-primary" />
                <span>
                  {user?.role === "content_creator"
                    ? "Content Creator"
                    : user?.role === "owner"
                    ? "Owner"
                    : "Administrator"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="admin-sidebar-scroll flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {filteredSections.map((section) => (
            <div key={section.label}>
              <p className="mb-1.5 px-3 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                {section.label}
              </p>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-150 ${
                          isActive
                            ? "bg-primary text-white shadow-xs"
                            : "text-white hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-md bg-white" />
                          )}

                          <Icon
                            size={16}
                            strokeWidth={isActive ? 2.2 : 1.8}
                            className="shrink-0 text-white"
                          />

                          {/* Menu name */}
                          <span className="truncate text-white">
                            {item.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Utility Items */}
        <div className="shrink-0 space-y-0.5 border-t border-white/10 p-3">
          {adminUtilityItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 text-white"
                />

                <span className="truncate text-white">{item.name}</span>
              </NavLink>
            );
          })}

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold text-white transition-colors hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut
              size={16}
              strokeWidth={1.8}
              className="shrink-0 text-white group-hover:text-red-300"
            />

            <span className="text-white group-hover:text-red-200">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
