import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLeft, PanelLeftClose, ExternalLink, LogOut, Shield } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const getPageTitle = (pathname) => {
  if (pathname === "/admin") return "Dashboard";
  if (pathname.startsWith("/admin/topics/add")) return "Add Topic";
  if (pathname.startsWith("/admin/topics/edit")) return "Edit Topic";
  if (pathname.startsWith("/admin/topics")) return "Topics";
  if (pathname.startsWith("/admin/lessons/add")) return "Add Lesson";
  if (pathname.startsWith("/admin/lessons/edit")) return "Edit Lesson";
  if (pathname.startsWith("/admin/lessons")) return "Lessons";
  if (pathname.startsWith("/admin/quizzes/add")) return "Add Quiz";
  if (pathname.startsWith("/admin/quizzes/edit")) return "Edit Quiz";
  if (pathname.startsWith("/admin/quizzes")) return "Quizzes";
  if (pathname.startsWith("/admin/schools")) return "Schools";
  if (pathname.startsWith("/admin/testimonials")) return "Testimonials";
  if (pathname.startsWith("/admin/team/add")) return "Add Team Member";
  if (pathname.startsWith("/admin/team/edit")) return "Edit Team Member";
  if (pathname.startsWith("/admin/team")) return "Team Members";
  if (pathname.startsWith("/admin/users")) return "Manage Users";
  if (pathname.startsWith("/admin/activity")) return "User Activity";
  if (pathname.startsWith("/admin/profile")) return "Admin Profile";
  return "Administration";
};

export default function AdminHeader({ sidebarOpen, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  const initials = (user?.fullName || user?.userName || user?.email || "A")
    .charAt(0)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-15 shrink-0 items-center justify-between border-b border-border bg-surface/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-secondary hover:border-primary-light hover:bg-surface-muted hover:text-primary transition"
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline font-sans text-xs font-semibold uppercase tracking-wider text-text-muted">
            {user?.role === "content_creator" ? "Content" : "Admin"}
          </span>
          <span className="hidden sm:inline text-text-muted/60">/</span>
          <h2 className="font-display text-sm sm:text-base font-bold text-text-primary">
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
          title="Open public website in new tab"
        >
          <ExternalLink size={13} />
          <span>View Site</span>
        </Link>

        <div className="hidden sm:block h-5 w-px bg-border" />

        {/* User profile capsule */}
        <div className="flex items-center gap-2.5 rounded-xl p-1 sm:px-2 sm:py-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-xs font-bold text-white shadow-xs">
            {initials}
          </div>

          <div className="hidden sm:block text-left">
            <p className="max-w-[140px] truncate text-xs font-bold text-text-primary leading-tight">
              {user?.fullName || user?.userName || "Admin"}
            </p>
            <p className="flex items-center gap-1 text-[10px] text-text-muted capitalize">
              <Shield size={10} className="text-primary" />
              {user?.role === "content_creator"
                ? "Content Creator"
                : user?.role === "owner"
                ? "Owner"
                : "Administrator"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          aria-label="Logout"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-error-light hover:text-error transition"
          title="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
