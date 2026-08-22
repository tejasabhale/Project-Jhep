import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Sproug Hub", path: "/sproug" },
  ];

  const dashboardPath = user?.role === "admin" ? "/admin" : "/content";

  const navLinkClasses = ({ isActive }) =>
    `relative whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-orange-600 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-orange-600"
        : "text-slate-600 hover:text-orange-600"
    }`;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate(dashboardPath);
    } else {
      navigate("/login");
    }

    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      {/* ==================== MAIN NAVBAR ==================== */}
      <div className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-full items-center justify-between">
          {/* ==================== LOGO ==================== */}
          <NavLink to="/" className="flex min-w-0 shrink-0 items-center gap-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12">
              <img
                src="/logo.svg"
                alt="Project Jhep Logo"
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              />
            </div>

            <span
              className="whitespace-nowrap text-[18px] font-bold leading-none tracking-[-0.04em] sm:text-[21px]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                color: "#17213B",
              }}
            >
              Project
              <span className="text-orange-500"> Jhep</span>
            </span>
          </NavLink>

          {/* ==================== DESKTOP NAVIGATION ==================== */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex xl:gap-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={navLinkClasses}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* ==================== DESKTOP ACTIONS ==================== */}
          <div className="ml-auto hidden items-center gap-3 lg:flex">
            {!isAuthenticated ? (
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-300 hover:scale-105 hover:bg-orange-700"
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate(dashboardPath)}
                  className="whitespace-nowrap text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                  {user?.role === "admin" ? "Admin Panel" : "Start Learning"}
                </button>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-300 hover:scale-105 hover:bg-orange-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* ==================== MOBILE MENU BUTTON ==================== */}
          <button
            type="button"
            className="ml-3 flex shrink-0 items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-orange-50 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="relative h-6 w-6">
              <Menu
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-out ${
                  open
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />

              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-out ${
                  open
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ==================== MOBILE MENU ==================== */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 ease-out lg:hidden ${
          open
            ? "max-h-[500px] translate-y-0 opacity-100"
            : "max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div
          className={`px-4 py-4 transition-all duration-500 ease-out sm:px-6 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {/* Mobile Links */}
          <nav className="flex flex-col gap-1">
            {links.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${index * 50}ms` : "0ms",
                }}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  } ${
                    open
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-3 opacity-0"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div
            className={`mt-3 flex flex-col gap-2 border-t border-slate-100 pt-4 transition-all duration-500 sm:flex-row ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{
              transitionDelay: open ? "180ms" : "0ms",
            }}
          >
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full rounded-full border border-orange-200 px-4 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-300 hover:bg-orange-50 sm:flex-1"
                >
                  Login
                </button>

                <button
                  onClick={handleStartLearning}
                  className="w-full rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-700 sm:flex-1"
                >
                  Start Learning
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate(dashboardPath);
                    setOpen(false);
                  }}
                  className="w-full rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-700 sm:flex-1"
                >
                  {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full rounded-full border border-orange-200 px-4 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-300 hover:bg-orange-50 sm:flex-1"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
