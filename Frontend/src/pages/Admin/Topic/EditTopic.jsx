import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, BookOpen, Loader2, Pencil } from "lucide-react";

import TopicForm from "../../../components/admin/topic/TopicForm";

import { getTopicById, updateTopic } from "../../../api/topic.api";

export default function EditTopic() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    loadTopic();
  }, [topicId]);

  const loadTopic = async () => {
    try {
      setPageLoading(true);

      const response = await getTopicById(topicId);

      const topic = response.data?.topic || response.topic || response.data;

      if (!topic) {
        throw new Error("Topic not found");
      }

      setInitialData({
        title: topic.title || "",
        description: topic.description || "",
        grade: topic.grade || "",
        order: topic.order ?? 1,
        isPublished: Boolean(topic.isPublished),
        thumbnail: topic.thumbnail?.url || null,
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load topic");

      navigate("/admin/topics/manage");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (form) => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", form.title.trim());
      data.append("description", form.description.trim());
      data.append("grade", form.grade);
      data.append("order", String(form.order));
      data.append("isPublished", String(Boolean(form.isPublished)));

      if (form.thumbnail instanceof File) {
        data.append("thumbnail", form.thumbnail);
      }

      await updateTopic(topicId, data);

      toast.success("Topic updated successfully");

      navigate("/admin/topics/manage");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update topic");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-orange-50 px-4 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="rounded-3xl bg-white px-10 py-12 text-center shadow-lg">
            <Loader2
              size={42}
              className="mx-auto mb-4 animate-spin text-orange-500"
            />

            <h2 className="text-xl font-semibold text-slate-800">
              Loading Topic
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we fetch the topic details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                <BookOpen size={28} className="text-orange-600" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Pencil size={16} className="text-orange-500" />

                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                    Topic Editor
                  </span>
                </div>

                <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                  Edit Topic
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Update topic information and publication settings.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/topics/manage")}
              className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
            >
              <ArrowLeft size={18} />
              Back to Topics
            </button>
          </div>
        </div>

        {initialData && (
          <TopicForm
            title="Topic Information"
            buttonText="Update Topic"
            initialData={initialData}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
