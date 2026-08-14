import { Pencil, Trash2 } from "lucide-react";

export default function LessonTable({ lessons, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading lessons...
      </div>
    );
  }

  if (!lessons.length) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        No lessons found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3 text-left">Thumbnail</th>
              <th className="px-4 py-3 text-left">Lesson</th>
              <th className="px-4 py-3 text-left">Topic</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="border-t hover:bg-orange-50">
                <td className="px-4 py-3">
                  <img
                    src={
                      lesson.thumbnail?.url ||
                      "https://placehold.co/60x60?text=No+Image"
                    }
                    alt={lesson.title}
                    className="h-14 w-14 rounded-lg border object-cover"
                  />
                </td>

                <td className="px-4 py-3 font-medium">{lesson.title}</td>

                <td className="px-4 py-3">{lesson.topic?.title}</td>

                <td className="px-4 py-3">{lesson.order}</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      lesson.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {lesson.isPublished ? "Published" : "Draft"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(lesson)}
                      className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(lesson)}
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
