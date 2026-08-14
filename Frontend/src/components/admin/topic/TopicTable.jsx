import { Pencil, Trash2 } from "lucide-react";

export default function TopicTable({ topics, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
        Loading topics...
      </div>
    );
  }

  if (!topics.length) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
        No topics found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Thumbnail
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Title
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Grade
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Order
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {topics.map((topic) => (
              <tr
                key={topic._id}
                className="border-t border-orange-100 hover:bg-orange-50"
              >
                <td className="px-4 py-3">
                  <img
                    src={
                      topic.thumbnail?.url ||
                      "https://placehold.co/60x60?text=No+Image"
                    }
                    alt={topic.title}
                    className="h-14 w-14 rounded-lg object-cover border"
                  />
                </td>

                <td className="px-4 py-3 font-medium text-slate-700">
                  {topic.title}
                </td>

                <td className="px-4 py-3 text-slate-600">{topic.grade}</td>

                <td className="px-4 py-3 text-slate-600">{topic.order}</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      topic.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {topic.isPublished ? "Published" : "Draft"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(topic)}
                      className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(topic)}
                      className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
