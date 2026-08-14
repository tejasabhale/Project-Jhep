import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Crown,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function UserFilters({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
}) {
  const [open, setOpen] = useState(false);

  const roles = [
    {
      value: "all",
      label: "All Roles",
      icon: <Filter size={16} />,
      style: "text-slate-600 bg-slate-50",
    },
    {
      value: "owner",
      label: "Owner",
      icon: <Crown size={16} />,
      style: "text-purple-600 bg-purple-50",
    },
    {
      value: "admin",
      label: "Admin",
      icon: <ShieldCheck size={16} />,
      style: "text-orange-600 bg-orange-50",
    },
    {
      value: "user",
      label: "User",
      icon: <UserRound size={16} />,
      style: "text-slate-600 bg-slate-50",
    },
  ];

  const selectedRole =
    roles.find((role) => role.value === roleFilter) || roles[0];

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">User Filters</h3>

          <p className="mt-1 text-sm text-slate-500">
            Search users and filter accounts by role.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-11
                pr-4
                text-sm
                outline-none
                transition
                focus:border-orange-400
                focus:bg-white
                focus:ring-2
                focus:ring-orange-100
              "
            />
          </div>

          <div className="relative sm:w-52">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-sm
                transition
                hover:bg-white
                focus:border-orange-400
                focus:ring-2
                focus:ring-orange-100
              "
            >
              <span className="flex items-center gap-2">
                {selectedRole.icon}

                {selectedRole.label}
              </span>

              <ChevronDown
                size={18}
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-100 bg-white p-2 shadow-lg">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => {
                      setRoleFilter(role.value);
                      setOpen(false);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      transition
                      hover:bg-slate-50
                    "
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${role.style}`}
                    >
                      {role.icon}
                    </span>

                    <span className="font-medium text-slate-700">
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
