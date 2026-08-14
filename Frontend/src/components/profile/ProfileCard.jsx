import {
  UserCircle,
  ShieldCheck,
  Mail,
  AtSign,
  Crown,
  User,
} from "lucide-react";

const ProfileCard = ({ user }) => {
  const isActive = user.status?.toLowerCase() === "active";
  const role = user.role?.toLowerCase();

  const roleConfig = {
    admin: {
      label: "Administrator",
      icon: ShieldCheck,
      iconClass: "text-orange-600",
      bgClass: "bg-orange-50",
    },
    owner: {
      label: "Owner",
      icon: Crown,
      iconClass: "text-amber-600",
      bgClass: "bg-amber-50",
    },
    user: {
      label: "User",
      icon: User,
      iconClass: "text-slate-600",
      bgClass: "bg-slate-50",
    },
  };

  const currentRole = roleConfig[role] || roleConfig.user;
  const RoleIcon = currentRole.icon;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-orange-50 ring-1 ring-slate-200">
            {user.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={user.fullName || "Profile"}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle
                size={44}
                strokeWidth={1.5}
                className="text-orange-300"
              />
            )}
          </div>

          <span
            className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
              isActive ? "bg-emerald-500" : "bg-slate-300"
            }`}
          />
        </div>

        {/* Identity */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="truncate text-xl font-bold tracking-tight text-slate-900">
              {user.fullName}
            </h1>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isActive ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
              {user.status}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <AtSign size={14} className="text-slate-400" />
              {user.userName}
            </span>

            <span className="hidden h-3.5 w-px bg-slate-200 sm:block" />

            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-slate-400" />
              {user.email}
            </span>
          </div>
        </div>

        {/* Role */}
        <div
          className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 ${currentRole.bgClass}`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
            <RoleIcon
              size={17}
              strokeWidth={2}
              className={currentRole.iconClass}
            />
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Role
            </p>
            <p className={`text-sm font-semibold ${currentRole.iconClass}`}>
              {currentRole.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
