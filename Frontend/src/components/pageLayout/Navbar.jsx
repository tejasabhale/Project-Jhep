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
  ];

  const dashboardPath = user?.role === "admin" ? "/admin" : "/topics";

  const navLinkClasses = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-orange-600 after:absolute after:left-0 after:-bottom-2 after:w-full after:h-0.5 after:bg-orange-600"
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/jwamgvca/image/upload/v1785234935/Project-Jhep-Logo_nsnlyc.png"
            alt="Project Jhep Logo"
            className="w-13 h-13 object-contain"
          />

          <span className="font-extrabold text-xl tracking-tight text-slate-800">
            Project
            <span className="text-orange-500"> Jhep</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <NavLink key={link.name} to={link.path} className={navLinkClasses}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="text-sm cursor-pointer font-semibold bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full shadow-md shadow-orange-200 transition-all hover:scale-105"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(dashboardPath)}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                {user?.role === "admin" ? "Admin Panel" : "Start Learning"}
              </button>

              <button
                onClick={handleLogout}
                className="text-sm cursor-pointer font-semibold bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full shadow-md shadow-orange-200 transition-all hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-3 shadow-lg">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium py-2 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="flex gap-3 pt-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="flex-1 text-sm font-semibold text-orange-600 border border-orange-200 px-4 py-2 rounded-full hover:bg-orange-50 transition-colors"
                >
                  Login
                </button>

                <button
                  onClick={handleStartLearning}
                  className="flex-1 text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full transition-colors"
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
                  className="flex-1 text-sm font-semibold bg-orange-600 text-white px-4 py-2 rounded-full"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex-1 text-sm font-semibold text-orange-600 border border-orange-200 px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
