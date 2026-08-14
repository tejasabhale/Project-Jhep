import { Pencil, Trash2, ShieldCheck, UserRound, Crown } from "lucide-react";

export default function UserTable({ users, onEdit, onDelete }) {
  const getRoleStyle = (role) => {
    switch (role) {
      case "owner":
        return {
          className: "bg-purple-100 text-purple-700",
          icon: <Crown size={16} />,
        };

      case "admin":
        return {
          className: "bg-orange-100 text-orange-700",
          icon: <ShieldCheck size={16} />,
        };

      case "user":
        return {
          className: "bg-slate-100 text-slate-700",
          icon: <UserRound size={16} />,
        };

      default:
        return {
          className: "bg-gray-100 text-gray-700",
          icon: <UserRound size={16} />,
        };
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-orange-100 bg-orange-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Mobile
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Role
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const roleStyle = getRoleStyle(user.role);

              return (
                <tr
                  key={user._id}
                  className="border-b border-slate-100 transition hover:bg-orange-50/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <UserRound size={22} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {user.fullName}
                        </p>

                        <p className="text-sm text-slate-500">
                          @{user.userName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.mobileNo || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${roleStyle.className}`}
                    >
                      {roleStyle.icon}

                      {user.role ? user.role.replace("_", " ") : "No Role"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(user)}
                        className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(user)}
                        className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
