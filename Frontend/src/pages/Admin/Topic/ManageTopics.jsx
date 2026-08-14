import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  BookOpen,
  Edit,
  Plus,
  Trash2,
  Layers,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

import { getAllTopics, deleteTopic } from "../../../api/topic.api";

export default function ManageTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);

      const response = await getAllTopics();

      let list = [];

      if (Array.isArray(response.data?.topics)) {
        list = response.data.topics;
      } else if (Array.isArray(response.data?.data?.topics)) {
        list = response.data.data.topics;
      } else if (Array.isArray(response.data)) {
        list = response.data;
      }

      setTopics(list);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this topic and all associated lessons?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTopic(id);

      toast.success("Topic deleted successfully");

      setTopics((prev) => prev.filter((topic) => topic._id !== id));
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

            <p className="font-medium text-slate-600">Loading topics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
                <BookOpen size={28} className="text-orange-600" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  Course Management
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                  Manage Topics
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Create, edit, and manage your learning topics.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Admin Dashboard */}
              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
              >
                <LayoutDashboard size={18} />
                Admin Dashboard
              </Link>

              {/* Add Topic */}
              <Link
                to="/admin/topics/add"
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                <Plus size={18} />
                Add Topic
              </Link>

              {/* Add Lesson */}
              <Link
                to="/admin/lessons/add"
                className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
              >
                <Plus size={18} />
                Add Lesson
              </Link>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">All Topics</h2>

            <p className="mt-1 text-sm text-slate-500">
              {topics.length} {topics.length === 1 ? "topic" : "topics"}{" "}
              available
            </p>
          </div>
        </div>

        {/* Empty State */}
        {topics.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
              <Layers size={26} className="text-orange-500" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No topics yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Create your first topic to start adding lessons.
            </p>

            <Link
              to="/admin/topics/add"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <Plus size={18} />
              Add Topic
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic._id}
                className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Topic Information */}
                <div className="flex gap-5 p-5">
                  <div className="shrink-0">
                    {topic.thumbnail?.url ? (
                      <img
                        src={topic.thumbnail.url}
                        alt={topic.title}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-orange-100">
                        <BookOpen size={30} className="text-orange-500" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold text-slate-800">
                          {topic.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Grade {topic.grade || "N/A"}
                        </p>
                      </div>

                      {/* Publish Status */}
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          topic.isPublished
                            ? "bg-green-50 text-green-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {topic.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>

                    {topic.description && (
                      <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
                        {topic.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Add Lesson for THIS topic */}
                    <Link
                      to={`/admin/lessons/add?topicId=${topic._id}`}
                      className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      <Plus size={17} />
                      Add Lesson
                    </Link>

                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <Link
                        to={`/admin/topics/edit/${topic._id}`}
                        className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-medium text-orange-600 transition hover:bg-orange-50"
                      >
                        <Edit size={17} />
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(topic._id)}
                        className="flex items-center justify-center rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                        title="Delete topic"
                      >
                        <Trash2 size={18} />
                      </button>

                      {/* View Lessons */}
                      <Link
                        to={`/admin/lessons/manage?topicId=${topic._id}`}
                        className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        title="View lessons"
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
