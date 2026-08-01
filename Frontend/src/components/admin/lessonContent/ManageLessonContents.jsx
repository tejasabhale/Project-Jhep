import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

import {
  getAllLessonContents,
  deleteLessonContent,
} from "../../../api/lessonContent.api";

export default function ManageLessonContents() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);

      const res = await getAllLessonContents();

      setContents(res.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to load lesson contents.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lesson content?")) return;

    try {
      await deleteLessonContent(id);

      toast.success("Lesson content deleted.");

      loadContents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete content.");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Lesson Contents</h1>

          <Link
            to="/admin/lesson-contents/add"
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Content
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading...</div>
        ) : contents.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No lesson contents found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-orange-100">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left">Lesson</th>
                  <th className="px-4 py-3 text-left">Topic</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Published</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {contents.map((content) => (
                  <tr key={content._id} className="border-t border-orange-100">
                    <td className="px-4 py-3">{content.lesson?.title}</td>

                    <td className="px-4 py-3">
                      {content.lesson?.topic?.title}
                    </td>

                    <td className="px-4 py-3 uppercase">{content.blockType}</td>

                    <td className="px-4 py-3">{content.title}</td>

                    <td className="px-4 py-3">{content.order}</td>

                    <td className="px-4 py-3">
                      {content.isPublished ? (
                        <span className="text-green-600">Published</span>
                      ) : (
                        <span className="text-red-500">Draft</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/lesson-contents/edit/${content._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(content._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
