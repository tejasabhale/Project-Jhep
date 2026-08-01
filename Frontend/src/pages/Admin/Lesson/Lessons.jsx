import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

import { getAllTopics } from "../../../api/topic.api";
import { getLessonsByTopic } from "../../../api/lesson.api";

export default function Lessons() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      fetchLessons(selectedTopic);
    } else {
      setLessons([]);
      setLoading(false);
    }
  }, [selectedTopic]);

  const fetchTopics = async () => {
    try {
      const res = await getAllTopics();
      setTopics(res.data.topics || []);
    } catch (error) {
      toast.error("Unable to load topics");
    }
  };

  const fetchLessons = async (topicId) => {
    try {
      setLoading(true);

      const res = await getLessonsByTopic(topicId);

      setLessons(res.data.lessons || []);
    } catch (error) {
      toast.error("Unable to load lessons");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lessons</h1>

          <p className="text-sm text-slate-500">
            Manage lessons for every topic.
          </p>
        </div>

        <Link
          to="/admin/lessons/add"
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Lesson
        </Link>
      </div>

      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium">Select Topic</label>

        <div className="flex gap-3">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="flex-1 rounded-xl border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="">Choose Topic</option>

            {topics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => fetchLessons(selectedTopic)}
            className="rounded-xl border border-orange-200 bg-orange-50 px-4 hover:bg-orange-100"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : lessons.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No lessons found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-5 py-4 text-left">Thumbnail</th>

                  <th className="px-5 py-4 text-left">Lesson</th>

                  <th className="px-5 py-4 text-left">Order</th>

                  <th className="px-5 py-4 text-left">Status</th>

                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson._id} className="border-t border-orange-100">
                    <td className="px-5 py-4">
                      <img
                        src={lesson.thumbnail?.url || "https://placehold.co/60"}
                        className="h-14 w-14 rounded-lg object-cover"
                        alt=""
                      />
                    </td>

                    <td className="px-5 py-4 font-medium">{lesson.title}</td>

                    <td className="px-5 py-4">{lesson.order}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          lesson.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {lesson.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/lessons/edit/${lesson._id}`}
                          className="rounded-lg border border-orange-200 p-2 text-orange-600 hover:bg-orange-100"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-100">
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
