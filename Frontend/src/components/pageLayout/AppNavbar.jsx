import { useEffect, useRef, useState } from "react";
import {
  UserCircle,
  User,
  LogOut,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AppNavbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const role = user?.role?.toLowerCase();

  const isAdminOrOwner = role === "admin" || role === "owner";

  const dashboardPath = isAdminOrOwner ? "/admin" : "/content";
  const profilePath = isAdminOrOwner ? "/admin/profile" : "/profile";

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* Close dropdown with Escape */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute inset-0
            opacity-[0.08]
            [background-image:radial-gradient(#f97316_0.6px,transparent_0.6px)]
            [background-size:24px_24px]
          "
        />

        <div className="absolute -right-24 -top-32 h-64 w-64 rounded-full bg-orange-100/40 blur-3xl" />
      </div>

      <nav className="relative mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ================= Logo ================= */}

        <button
          type="button"
          onClick={() => navigate(dashboardPath)}
          className="group flex items-center"
        >
          <div className="flex h-33 w-33 shrink-0 items-center justify-center">
            <img
              src="/logo.svg"
              alt="Project Jhep Logo"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div className="-ml-4 text-left leading-none">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Project <span className="text-orange-500">Jhep</span>
            </h1>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {isAdminOrOwner ? "Admin Panel" : "Learn English"}
              </p>
            </div>
          </div>
        </button>

        {/* ================= Right Section ================= */}

        <div className="flex items-center gap-3">
          {/* Browser Navigation */}

          <div className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 md:flex">
            <button
              type="button"
              onClick={goBack}
              title="Go Back"
              aria-label="Go back"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg text-slate-500 transition
                hover:bg-white hover:text-orange-500 hover:shadow-sm
              "
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={goForward}
              title="Go Forward"
              aria-label="Go forward"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg text-slate-500 transition
                hover:bg-white hover:text-orange-500 hover:shadow-sm
              "
            >
              <ArrowRight size={17} />
            </button>
          </div>

          {/* Divider */}

          <div className="hidden h-7 w-px bg-slate-200 sm:block" />

          {/* ================= Profile ================= */}

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="
                flex items-center gap-2.5
                rounded-full border border-slate-200
                bg-white py-1.5 pl-1.5 pr-2.5
                shadow-sm transition-all
                hover:border-orange-200
                hover:bg-orange-50/50
              "
            >
              {/* Avatar */}

              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-orange-50">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt={user.fullName || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle
                    size={22}
                    strokeWidth={1.7}
                    className="text-orange-500"
                  />
                )}
              </div>

              <div className="hidden text-left sm:block">
                <p className="max-w-32 truncate text-xs font-semibold text-slate-800">
                  {user?.fullName || "Profile"}
                </p>

                <p className="text-[10px] capitalize text-slate-400">
                  {user?.role || "User"}
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`hidden text-slate-400 transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* ================= Dropdown ================= */}

            {profileOpen && (
              <div
                role="menu"
                className="
                  absolute right-0 top-full z-50 mt-2
                  w-60 overflow-hidden
                  rounded-2xl border border-slate-200
                  bg-white shadow-xl shadow-slate-200/60
                "
              >
                {/* User Info */}

                <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user?.fullName || "User"}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {user?.email || ""}
                  </p>
                </div>

                <div className="p-1.5">
                  {/* Profile */}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      navigate(profilePath);
                      setProfileOpen(false);
                    }}
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium text-slate-600
                      transition
                      hover:bg-orange-50 hover:text-orange-600
                    "
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                      <User size={16} />
                    </span>

                    <div className="text-left">
                      <p>Profile</p>

                      <p className="text-[10px] font-normal text-slate-400">
                        Manage your account
                      </p>
                    </div>
                  </button>

                  {/* Content - All Users */}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      navigate("/content");
                      setProfileOpen(false);
                    }}
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium text-slate-600
                      transition
                      hover:bg-orange-50 hover:text-orange-600
                    "
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                      <BookOpen size={16} />
                    </span>

                    <div className="text-left">
                      <p>Content</p>

                      <p className="text-[10px] font-normal text-slate-400">
                        Explore learning content
                      </p>
                    </div>
                  </button>

                  {/* Admin Panel - Admin & Owner Only */}

                  {isAdminOrOwner && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        navigate("/admin");
                        setProfileOpen(false);
                      }}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm font-medium text-slate-600
                        transition
                        hover:bg-orange-50 hover:text-orange-600
                      "
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                        <ShieldCheck size={16} />
                      </span>

                      <div className="text-left">
                        <p>Admin Panel</p>

                        <p className="text-[10px] font-normal text-slate-400">
                          Manage Project Jhep
                        </p>
                      </div>
                    </button>
                  )}

                  <div className="my-1.5 border-t border-slate-100" />

                  {/* Logout */}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium text-red-500
                      transition
                      hover:bg-red-50
                    "
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                      <LogOut size={16} />
                    </span>

                    <div className="text-left">
                      <p>Logout</p>

                      <p className="text-[10px] font-normal text-red-300">
                        Sign out of your account
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppNavbar;
