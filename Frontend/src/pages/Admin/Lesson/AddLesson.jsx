import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllTopics } from "../../../api/topic.api";
import { createLesson } from "../../../api/lesson.api";

import LessonHeader from "../../../components/admin/lesson/LessonHeader";
import LessonForm from "../../../components/admin/lesson/LessonForm";

export default function AddLesson() {
  const [topics, setTopics] = useState([]);
  const [topicLoading, setTopicLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    topic: "",
    title: "",
    description: "",
    order: 1,
    isPublished: false,
    thumbnail: null,
  });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setTopicLoading(true);

      const res = await getAllTopics();

      let topicList = [];

      if (Array.isArray(res.data)) {
        topicList = res.data;
      } else if (Array.isArray(res.data.data)) {
        topicList = res.data.data;
      } else if (Array.isArray(res.data.data?.topics)) {
        topicList = res.data.data.topics;
      } else if (Array.isArray(res.data.topics)) {
        topicList = res.data.topics;
      }

      const formattedTopics = topicList.map((topic) => ({
        _id: topic._id || topic.id,
        title: topic.title,
      }));

      setTopics(formattedTopics);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load topics.");

      setTopics([]);
    } finally {
      setTopicLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating lesson...");

    try {
      setLoading(true);

      const data = new FormData();

      data.append("topicId", form.topic);
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("order", form.order);
      data.append("isPublished", form.isPublished);

      if (form.thumbnail) {
        data.append("thumbnail", form.thumbnail);
      }

      await createLesson(data);

      toast.success("Lesson created successfully!", {
        id: toastId,
      });

      setForm({
        topic: "",
        title: "",
        description: "",
        order: 1,
        isPublished: false,
        thumbnail: null,
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <LessonHeader />

        {topicLoading ? (
          <div className="text-center py-10 text-slate-500">
            Loading topics...
          </div>
        ) : (
          <LessonForm
            topics={topics}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
