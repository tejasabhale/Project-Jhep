import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

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
  }, []);

  const loadTopic = async () => {
    try {
      setPageLoading(true);

      const response = await getTopicById(topicId);

      const topic = response.data?.topic || response.topic || response.data;

      setInitialData({
        title: topic.title || "",

        description: topic.description || "",

        grade: topic.grade || "",

        order: topic.order || 0,

        isPublished: topic.isPublished || false,

        thumbnail: null,
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to load topic");
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

      data.append("grade", form.grade);

      data.append("order", form.order);

      data.append("isPublished", form.isPublished);

      if (form.thumbnail instanceof File) {
        data.append("thumbnail", form.thumbnail);
      }

      await updateTopic(topicId, data);

      toast.success("Topic updated successfully");

      navigate("/admin/topics/manage");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="p-6 text-center">Loading topic...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-6xl">
        <TopicForm
          title="Edit Topic"
          buttonText="Update Topic"
          initialData={initialData}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
