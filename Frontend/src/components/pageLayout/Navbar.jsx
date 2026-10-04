import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

import useAuth from "../../hooks/useAuth";

const LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Sproug Hub", path: "/sproug" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

const btnPrimary = `inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-200 transition-colors hover:bg-orange-700 ${focusRing}`;

const btnGhost = `inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700 ${focusRing}`;

const btnOutline = `inline-flex items-center justify-center whitespace-nowrap rounded-full border border-orange-200 px-4 py-2.5 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 ${focusRing}`;

const desktopLinkClasses = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${focusRing} ${
    isActive
      ? "bg-orange-50 text-orange-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
  }`;

const mobileLinkClasses = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${focusRing} ${
    isActive
      ? "bg-orange-50 text-orange-700"
      : "text-slate-700 hover:bg-slate-50"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isAdmin = user?.role === "admin";
  const dashboardPath = isAdmin ? "/admin" : "/content";
  const dashboardLabel = isAdmin ? "Admin panel" : "Start learning";

  const displayName = user?.name || user?.email || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenuOpen(false);
      }
    };

    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  const handleNavLinkClick = () => {
    scrollToTop();
    setOpen(false);
    setMenuOpen(false);
  };

  const go = (path) => {
    navigate(path);
    scrollToTop();
    setOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    setOpen(false);
    setMenuOpen(false);

    await logout();

    navigate("/");
    scrollToTop();
  };

  const handleStartLearning = () =>
    go(isAuthenticated ? dashboardPath : "/login");

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-slate-200 shadow-[0_4px_20px_-12px_rgba(23,33,59,0.25)]"
          : "border-slate-100"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          onClick={handleNavLinkClick}
          aria-label="Project Jhep home"
          className={`flex shrink-0 items-center gap-2 rounded-lg ${focusRing}`}
        >
          <img
            src="/logo.svg"
            alt=""
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <span
            className="whitespace-nowrap text-[18px] font-bold leading-none tracking-[-0.04em] sm:text-[21px]"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "#17213B",
            }}
          >
            Project<span className="text-orange-500"> Jhep</span>
          </span>
        </NavLink>

        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={handleNavLinkClick}
              className={desktopLinkClasses}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          {!isAuthenticated ? (
            <>
              <button onClick={() => go("/login")} className={btnGhost}>
                Login
              </button>

              <button onClick={handleStartLearning} className={btnPrimary}>
                Start learning
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go(dashboardPath)} className={btnPrimary}>
                {dashboardLabel}
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className={`flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3 transition-colors hover:bg-slate-50 ${focusRing}`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                    {initial}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  role="menu"
                  className={`absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-100 bg-white p-1.5 shadow-lg shadow-slate-200/70 transition duration-150 ${
                    menuOpen
                      ? "visible scale-100 opacity-100"
                      : "invisible scale-95 opacity-0"
                  }`}
                >
                  <p className="truncate px-3 py-2 text-sm font-semibold text-slate-800">
                    {displayName}
                  </p>

                  <button
                    role="menuitem"
                    onClick={() => go(dashboardPath)}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {isAdmin ? "Admin panel" : "Dashboard"}
                  </button>

                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-orange-50 lg:hidden ${focusRing}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-x-0 bottom-0 top-16 bg-slate-900/20 transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full grid border-b border-slate-100 bg-white shadow-lg transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-4 sm:px-6">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={handleNavLinkClick}
                  className={mobileLinkClasses}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => go("/login")}
                    className={`${btnOutline} w-full sm:flex-1`}
                  >
                    Login
                  </button>

                  <button
                    onClick={handleStartLearning}
                    className={`${btnPrimary} w-full sm:flex-1`}
                  >
                    Start learning
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => go(dashboardPath)}
                    className={`${btnPrimary} w-full sm:flex-1`}
                  >
                    {isAdmin ? "Admin panel" : "Dashboard"}
                  </button>

                  <button
                    onClick={handleLogout}
                    className={`${btnOutline} w-full sm:flex-1`}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
