import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import LessonForm from "../../../components/admin/lesson/LessonForm";
import { getAllTopics } from "../../../api/topic.api";
import { createLesson } from "../../../api/lesson.api";

export default function AddLesson() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const topicIdFromUrl = searchParams.get("topicId");

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    topic: topicIdFromUrl || "",
    title: "",
    description: "",
    order: 1,
    thumbnail: null,
    fileType: "",
    fileName: "",
    fileUrl: "",
    fileDuration: "",
    isPublished: false,
  });

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (topicIdFromUrl) {
      setForm((prev) => ({
        ...prev,
        topic: topicIdFromUrl,
      }));
    }
  }, [topicIdFromUrl]);

  const loadTopics = async () => {
    try {
      setPageLoading(true);

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
      setPageLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("topicId", formData.topic);
      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("order", formData.order);
      data.append("fileType", formData.fileType);
      data.append("fileName", formData.fileName.trim());
      data.append("fileUrl", formData.fileUrl.trim());
      data.append("fileDuration", formData.fileDuration?.trim() || "");
      data.append("isPublished", String(Boolean(formData.isPublished)));

      if (formData.thumbnail instanceof File) {
        data.append("thumbnail", formData.thumbnail);
      }

      await createLesson(data);

      toast.success("Lesson created successfully");

      if (formData.topic) {
        navigate(`/admin/lessons/manage?topicId=${formData.topic}`);
      } else {
        navigate("/admin/lessons/manage");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-orange-50 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

            <p className="font-medium text-slate-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Add Lesson
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a new lesson and add it to a topic.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <LessonForm
            topics={topics}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            showTopic={true}
            lockedTopic={Boolean(topicIdFromUrl)}
          />
        </div>
      </div>
    </div>
  );
}
