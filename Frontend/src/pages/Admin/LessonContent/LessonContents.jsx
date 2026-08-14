import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import { getAllTopics } from "../../../api/topic.api";
import { getLessonsByTopic } from "../../../api/lesson.api";

import {
  getLessonContents,
  deleteLessonContent,
} from "../../../api/lessonContent.api";

export default function LessonContents() {
  const [topics, setTopics] = useState([]);

  const [lessons, setLessons] = useState([]);

  const [contents, setContents] = useState([]);

  const [selectedTopic, setSelectedTopic] = useState("");

  const [selectedLesson, setSelectedLesson] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      loadLessons(selectedTopic);
    } else {
      setLessons([]);
      setSelectedLesson("");
      setContents([]);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (selectedLesson) {
      loadContents(selectedLesson);
    } else {
      setContents([]);
    }
  }, [selectedLesson]);

  const loadTopics = async () => {
    try {
      const res = await getAllTopics();

      setTopics(res.data.topics || []);
    } catch {
      toast.error("Unable to load topics.");
    }
  };

  const loadLessons = async (topicId) => {
    try {
      const res = await getLessonsByTopic(topicId);

      setLessons(res.data.lessons || []);
    } catch {
      toast.error("Unable to load lessons.");
    }
  };

  const loadContents = async (lessonId) => {
    try {
      setLoading(true);

      const res = await getLessonContents(lessonId);

      setContents(res.data.contents || []);
    } catch {
      toast.error("Unable to load lesson contents.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contentId) => {
    if (!window.confirm("Delete this content?")) return;

    try {
      await deleteLessonContent(contentId);

      toast.success("Deleted");

      loadContents(selectedLesson);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lesson Content</h1>

          <p className="text-sm text-slate-500">Manage lesson resources.</p>
        </div>

        <Link
          to="/admin/lesson-content/add"
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Content
        </Link>
      </div>

      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="rounded-xl border border-orange-200 px-4 py-3"
          >
            <option value="">Select Topic</option>

            {topics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.title}
              </option>
            ))}
          </select>

          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="rounded-xl border border-orange-200 px-4 py-3"
            disabled={!selectedTopic}
          >
            <option value="">Select Lesson</option>

            {lessons.map((lesson) => (
              <option key={lesson._id} value={lesson._id}>
                {lesson.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : contents.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No lesson content found.
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-5 py-4 text-left">Title</th>

                <th className="px-5 py-4 text-left">Type</th>

                <th className="px-5 py-4 text-left">Order</th>

                <th className="px-5 py-4 text-left">Provider</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {contents.map((content) => (
                <tr key={content._id} className="border-t border-orange-100">
                  <td className="px-5 py-4">{content.title}</td>

                  <td className="px-5 py-4 uppercase">{content.blockType}</td>

                  <td className="px-5 py-4">{content.order}</td>

                  <td className="px-5 py-4">{content.file.provider}</td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/lesson-content/edit/${content._id}`}
                        className="rounded-lg border border-orange-200 p-2 text-orange-600 hover:bg-orange-100"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(content._id)}
                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
