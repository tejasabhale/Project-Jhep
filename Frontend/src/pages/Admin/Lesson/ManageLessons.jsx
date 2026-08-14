import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Edit,
  Trash2,
  Plus,
  BookOpen,
  ArrowLeft,
  Presentation,
  Video,
  Star,
} from "lucide-react";

import {
  getLessons,
  deleteLesson,
  toggleFeaturedLesson,
} from "../../../api/lesson.api";

export default function ManageLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(null);

  const [searchParams] = useSearchParams();

  const topicId = searchParams.get("topicId");

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);

      const response = await getLessons();

      let list = [];

      if (Array.isArray(response.data?.lessons)) {
        list = response.data.lessons;
      } else if (Array.isArray(response.data?.data?.lessons)) {
        list = response.data.data.lessons;
      } else if (Array.isArray(response.data)) {
        list = response.data;
      } else if (Array.isArray(response.data?.data)) {
        list = response.data.data;
      }

      if (topicId) {
        list = list.filter(
          (lesson) => lesson.topic?._id === topicId || lesson.topic === topicId,
        );
      }

      setLessons(list);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this lesson?");

    if (!confirmDelete) return;

    try {
      await deleteLesson(id);

      toast.success("Lesson deleted");

      setLessons((prev) => prev.filter((lesson) => lesson._id !== id));
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleToggleFeatured = async (lesson) => {
    try {
      setFeaturedLoading(lesson._id);

      const response = await toggleFeaturedLesson(lesson._id);

      const updatedLesson =
        response?.data?.data || response?.data || response?.lesson;

      if (!updatedLesson) {
        throw new Error("Updated lesson data not received");
      }

      setLessons((prev) =>
        prev.map((item) =>
          item._id === lesson._id
            ? {
                ...item,
                isFeatured: updatedLesson.isFeatured,
              }
            : item,
        ),
      );

      toast.success(
        updatedLesson.isFeatured
          ? "Lesson added to featured"
          : "Lesson removed from featured",
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update featured status",
      );
    } finally {
      setFeaturedLoading(null);
    }
  };

  const getLessonIcon = (lesson) => {
    const type = (lesson.file?.type || lesson.type || "").toLowerCase();

    const name = (
      lesson.file?.name ||
      lesson.name ||
      lesson.title ||
      ""
    ).toLowerCase();

    if (
      type === "video" ||
      type === "mp4" ||
      type === "video/mp4" ||
      name.endsWith(".mp4") ||
      name.endsWith(".webm") ||
      name.endsWith(".mov")
    ) {
      return <Video size={20} className="text-orange-600" />;
    }

    if (
      type === "pptx" ||
      type === "ppt" ||
      type === "powerpoint" ||
      name.endsWith(".pptx") ||
      name.endsWith(".ppt")
    ) {
      return <Presentation size={20} className="text-orange-600" />;
    }

    return <BookOpen size={20} className="text-orange-600" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

            <p className="font-medium text-slate-600">Loading lessons...</p>
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
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                <BookOpen size={28} className="text-orange-600" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  Course Management
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                  Manage Lessons
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {topicId
                    ? "Lessons belonging to the selected topic."
                    : "Manage all lessons across your topics."}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                to="/admin/topics/manage"
                className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
              >
                <ArrowLeft size={17} />
                Topics
              </Link>

              <Link
                to={
                  topicId
                    ? `/admin/lessons/add?topicId=${topicId}`
                    : "/admin/lessons/add"
                }
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                <Plus size={18} />
                Add Lesson
              </Link>
            </div>
          </div>
        </div>

        {/* Lesson Count */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800">
            {topicId ? "Topic Lessons" : "All Lessons"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
          </p>
        </div>

        {/* Empty State */}
        {lessons.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
              <BookOpen size={26} className="text-orange-500" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No lessons yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {topicId
                ? "This topic does not have any lessons yet."
                : "Create your first lesson to get started."}
            </p>

            <Link
              to={
                topicId
                  ? `/admin/lessons/add?topicId=${topicId}`
                  : "/admin/lessons/add"
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <Plus size={18} />
              Add Lesson
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="flex flex-col gap-5 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Lesson Information */}
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                      {getLessonIcon(lesson)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-800">
                        {lesson.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Topic: {lesson.topic?.title || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                      Order: {lesson.order}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        lesson.isPublished
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {lesson.isPublished ? "Published" : "Unpublished"}
                    </span>

                    {lesson.isFeatured && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                        <Star size={12} fill="currentColor" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  {/* Featured */}
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(lesson)}
                    disabled={
                      featuredLoading === lesson._id || !lesson.isPublished
                    }
                    className={`flex items-center justify-center rounded-xl p-3 transition ${
                      lesson.isFeatured
                        ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                        : "border border-orange-200 bg-white text-orange-500 hover:bg-orange-50"
                    } ${
                      !lesson.isPublished ? "cursor-not-allowed opacity-40" : ""
                    }`}
                    title={
                      !lesson.isPublished
                        ? "Publish lesson first"
                        : lesson.isFeatured
                          ? "Remove from Featured"
                          : "Add to Featured"
                    }
                  >
                    <Star
                      size={18}
                      fill={lesson.isFeatured ? "currentColor" : "none"}
                      className={
                        featuredLoading === lesson._id ? "animate-pulse" : ""
                      }
                    />
                  </button>

                  {/* Edit */}
                  <Link
                    to={`/admin/lessons/edit/${lesson._id}`}
                    className="flex items-center justify-center rounded-xl border border-orange-200 bg-white p-3 text-orange-600 transition hover:bg-orange-50"
                    title="Edit Lesson"
                  >
                    <Edit size={18} />
                  </Link>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(lesson._id)}
                    className="flex items-center justify-center rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                    title="Delete Lesson"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
