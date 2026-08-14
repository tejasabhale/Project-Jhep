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
    `relative text-sm font-medium transition-colors duration-300 ${
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
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <div className="flex h-33 w-33 shrink-0 items-center justify-center">
            <img
              src="/logo.svg"
              alt="Project Jhep Logo"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Reduced gap between logo and text */}
          <span className="-ml-5 text-xl font-extrabold tracking-tight text-slate-800">
            Project
            <span className="text-orange-500"> Jhep</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink key={link.name} to={link.path} className={navLinkClasses}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
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
                className="text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-orange-50 lg:hidden"
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

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white shadow-lg transition-all duration-300 ease-out lg:hidden ${
          open
            ? "max-h-[500px] translate-y-0 opacity-100"
            : "max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div
          className={`px-5 py-4 transition-all duration-500 ease-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            {links.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${index * 50}ms` : "0ms",
                }}
                className={({ isActive }) =>
                  `rounded-md px-2 py-2.5 text-sm font-medium transition-all duration-300 ${
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
          </div>

          {/* Mobile Actions */}
          <div
            className={`flex gap-3 pt-4 transition-all duration-500 ${
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
                  className="flex-1 rounded-full border border-orange-200 px-4 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-300 hover:bg-orange-50"
                >
                  Login
                </button>

                <button
                  onClick={handleStartLearning}
                  className="flex-1 rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-700"
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
                  className="flex-1 rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-700"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex-1 rounded-full border border-orange-200 px-4 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-300 hover:bg-orange-50"
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
