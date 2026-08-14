import { Edit3, Trash2, MapPin, School, Power } from "lucide-react";

const SchoolTable = ({ schools = [], onEdit, onDelete, onToggleStatus }) => {
  if (!schools.length) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
          <School size={26} className="text-orange-500" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          No schools found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or add a new school.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="border-b border-orange-100 bg-orange-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                School
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Location
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {schools.map((school) => (
              <tr key={school._id} className="transition hover:bg-orange-50/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                      <School size={19} className="text-orange-500" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {school.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        Order: {school.order ?? 0}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="shrink-0 text-gray-400" />

                    <span>{school.location}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      school.isActive
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        school.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    />

                    {school.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(school)}
                      title={
                        school.isActive
                          ? "Deactivate school"
                          : "Activate school"
                      }
                      className={`rounded-lg p-2 transition ${
                        school.isActive
                          ? "text-gray-400 hover:bg-red-50 hover:text-red-500"
                          : "text-gray-400 hover:bg-green-50 hover:text-green-500"
                      }`}
                    >
                      <Power size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(school)}
                      title="Edit school"
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-orange-50 hover:text-orange-500"
                    >
                      <Edit3 size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(school)}
                      title="Delete school"
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-6 py-3">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">{schools.length}</span>{" "}
          {schools.length === 1 ? "school" : "schools"}
        </p>
      </div>
    </div>
  );
};

export default SchoolTable;
