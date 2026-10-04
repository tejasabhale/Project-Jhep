import { Menu, Bell } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

export default function AdminTopbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-border-light bg-background/95 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open admin menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-secondary transition-all duration-300 hover:border-primary-light hover:bg-accent-light hover:text-primary-dark lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
              Administration
            </p>

            <h1 className="mt-0.5 font-display text-lg font-bold text-secondary sm:text-xl">
              Dashboard
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-all duration-300 hover:border-primary-light hover:bg-accent-light hover:text-primary-dark"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={1.8} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          <div className="hidden h-8 w-px bg-border-light sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light font-display text-sm font-bold text-primary-dark">
              {(user?.fullName || user?.userName || user?.email || "A")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="hidden sm:block">
              <p className="max-w-[150px] truncate font-sans text-sm font-semibold text-secondary">
                {user?.fullName || user?.userName || "Admin"}
              </p>

              <p className="font-sans text-[11px] text-text-muted">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
