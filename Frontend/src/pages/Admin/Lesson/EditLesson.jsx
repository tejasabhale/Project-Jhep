import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, BookOpen, Pencil, Loader2 } from "lucide-react";

import { getLessonById, updateLesson } from "../../../api/lesson.api";
import { getAllTopics } from "../../../api/topic.api";

import LessonForm from "../../../components/admin/lesson/LessonForm";

export default function EditLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [initialData, setInitialData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setPageLoading(true);

      const [lessonResponse, topicResponse] = await Promise.all([
        getLessonById(lessonId),
        getAllTopics(),
      ]);

      const lesson =
        lessonResponse.data?.lesson ||
        lessonResponse.lesson ||
        lessonResponse.data;

      const topicData =
        topicResponse.data?.topics || topicResponse.data?.data?.topics || [];

      setTopics(
        topicData.map((topic) => ({
          _id: topic._id,
          title: topic.title,
        })),
      );

      setInitialData({
        topic: lesson.topic?._id || lesson.topic || "",
        title: lesson.title || "",
        description: lesson.description || "",
        order: lesson.order || 1,
        isPublished: lesson.isPublished || false,
        thumbnail: lesson.thumbnail?.url || null,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load lesson");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (form) => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("topicId", form.topic);
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("order", form.order);
      data.append("isPublished", form.isPublished);

      if (form.thumbnail instanceof File) {
        data.append("thumbnail", form.thumbnail);
      }

      await updateLesson(lessonId, data);

      toast.success("Lesson updated successfully");

      navigate("/admin/lessons/manage");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50">
        <div className="rounded-3xl bg-white px-10 py-12 shadow-lg">
          <Loader2
            className="mx-auto mb-4 animate-spin text-orange-500"
            size={42}
          />

          <h2 className="text-xl font-semibold text-slate-700 text-center">
            Loading Lesson...
          </h2>

          <p className="mt-2 text-center text-slate-500">
            Please wait while we fetch lesson details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Top Header */}

        <div className="mb-8 flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="rounded-3xl bg-orange-100 p-5">
              <BookOpen size={34} className="text-orange-600" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Pencil size={18} className="text-orange-500" />

                <span className="font-semibold uppercase tracking-wider text-orange-500">
                  Lesson Editor
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-bold text-slate-800">
                Edit Lesson
              </h1>

              <p className="mt-2 text-slate-500">
                Update lesson information, thumbnail, order, publication status,
                and topic.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/lessons/manage")}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-orange-200
              bg-orange-50
              px-5
              py-3
              text-orange-600
              transition
              hover:bg-orange-100
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Form Card */}

        <div className="rounded-3xl bg-white shadow-lg">
          <div className="border-b border-orange-100 px-8 py-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Lesson Information
            </h2>

            <p className="mt-2 text-slate-500">
              Modify the lesson details below and click
              <strong> Save Lesson</strong> when finished.
            </p>
          </div>

          <div className="p-8">
            <LessonForm
              topics={topics}
              form={initialData}
              setForm={setInitialData}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
