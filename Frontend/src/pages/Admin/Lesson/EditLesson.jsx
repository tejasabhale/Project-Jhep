import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

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

        thumbnail: null,
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
    return <div className="p-6 text-center">Loading lesson...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-4xl">
        <LessonForm
          topics={topics}
          form={initialData}
          setForm={setInitialData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
