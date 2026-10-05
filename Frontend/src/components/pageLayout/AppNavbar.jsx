import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Loader2,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

/* One reusable row for every dropdown item */
function MenuItem({
  icon: Icon,
  label,
  hint,
  onClick,
  danger = false,
  disabled,
}) {
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-60 ${
        danger
          ? "text-red-600 hover:bg-red-50 focus-visible:bg-red-50"
          : "text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:bg-orange-50 focus-visible:text-orange-700"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          danger ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
        }`}
      >
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block">{label}</span>
        <span
          className={`block text-xs font-normal ${
            danger ? "text-red-400" : "text-slate-400"
          }`}
        >
          {hint}
        </span>
      </span>
    </button>
  );
}

const AppNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const profileRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const role = user?.role?.toLowerCase();
  const isAdminOrOwner = role === "admin" || role === "owner";
  const isContentCreator = role === "content_creator";
  const dashboardPath = isContentCreator
    ? "/admin/topics/manage"
    : isAdminOrOwner
    ? "/admin"
    : "/content";
  const profilePath =
    isAdminOrOwner || isContentCreator ? "/admin/profile" : "/profile";

  const displayName = user?.fullName || "Profile";

  const closeMenu = useCallback((returnFocus = false) => {
    setProfileOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const menuItems = () =>
    Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') ?? []);

  /* Shadow only after scrolling */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  /* Outside click + Escape */
  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu(true);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [closeMenu]);

  /* Move focus into the menu when it opens */
  useEffect(() => {
    if (profileOpen) menuItems()[0]?.focus();
  }, [profileOpen]);

  const handleMenuKeyDown = (e) => {
    const items = menuItems();
    const index = items.indexOf(document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      setProfileOpen(false);
    }
  };

  const go = (path) => {
    navigate(path);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  const historyButton = `flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-orange-600 hover:shadow-sm ${focusRing}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-slate-200 shadow-[0_4px_20px_-12px_rgba(23,33,59,0.25)]"
          : "border-slate-100"
      }`}
    >
      <nav
        aria-label="App"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <NavLink
          to={dashboardPath}
          aria-label="Project Jhep dashboard"
          className={`flex min-w-0 items-center gap-2.5 rounded-lg ${focusRing}`}
        >
          <img
            src="/logo.svg"
            alt=""
            className="h-9 w-9 shrink-0 object-contain"
          />

          <span className="min-w-0 leading-none">
            <span
              className="block whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-xl"
              style={{ color: "#17213B" }}
            >
              Project <span className="text-orange-500">Jhep</span>
            </span>
            <span className="mt-1 block text-xs font-medium text-slate-400">
              {isAdminOrOwner
                ? "Admin panel"
                : isContentCreator
                ? "Content panel"
                : "Learn English"}
            </span>
          </span>
        </NavLink>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Back / forward */}
          <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 md:flex">
            <button
              type="button"
              onClick={() => window.history.back()}
              title="Go back"
              aria-label="Go back"
              className={historyButton}
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => window.history.forward()}
              title="Go forward"
              aria-label="Go forward"
              className={historyButton}
            >
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="hidden h-7 w-px bg-slate-200 md:block" />

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-label="Account menu"
              className={`flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-2 transition-colors hover:border-orange-200 hover:bg-orange-50/50 sm:pr-3 ${focusRing}`}
            >
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user?.fullName)
                )}
              </span>

              <span className="hidden text-left sm:block">
                <span className="block max-w-32 truncate text-sm font-semibold leading-tight text-slate-800">
                  {displayName}
                </span>
                <span className="block text-xs capitalize leading-tight text-slate-400">
                  {user?.role === "content_creator"
                    ? "Content Creator"
                    : user?.role === "owner"
                    ? "Owner"
                    : user?.role || "User"}
                </span>
              </span>

              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown (always mounted so it can animate; invisible = unfocusable) */}
            <div
              ref={menuRef}
              role="menu"
              aria-label="Account"
              onKeyDown={handleMenuKeyDown}
              className={`absolute right-0 top-full mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 transition duration-150 motion-reduce:transition-none ${
                profileOpen
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-95 opacity-0"
              }`}
            >
              <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {user?.fullName || "User"}
                </p>
                {user?.email && (
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {user.email}
                  </p>
                )}
              </div>

              <div className="p-1.5">
                <MenuItem
                  icon={User}
                  label="Profile"
                  hint="Manage your account"
                  onClick={() => go(profilePath)}
                />
                <MenuItem
                  icon={BookOpen}
                  label="Content"
                  hint="Explore learning content"
                  onClick={() => go("/content")}
                />
                {isAdminOrOwner && (
                  <MenuItem
                    icon={ShieldCheck}
                    label="Admin panel"
                    hint="Manage Project Jhep"
                    onClick={() => go("/admin")}
                  />
                )}
                {isContentCreator && (
                  <MenuItem
                    icon={BookOpen}
                    label="Content Studio"
                    hint="Manage topics, lessons & quizzes"
                    onClick={() => go("/admin/topics/manage")}
                  />
                )}

                <div className="my-1.5 border-t border-slate-100" />

                <MenuItem
                  danger
                  icon={loggingOut ? Loader2 : LogOut}
                  label={loggingOut ? "Signing out…" : "Logout"}
                  hint="Sign out of your account"
                  disabled={loggingOut}
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppNavbar;
