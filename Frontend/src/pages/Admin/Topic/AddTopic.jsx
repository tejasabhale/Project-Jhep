import { useState } from "react";
import { toast } from "react-hot-toast";

import TopicForm from "../../../components/admin/topic/TopicForm";
import { createTopic } from "../../../api/topic.api";

export default function AddTopic() {
  const [loading, setLoading] = useState(false);

  const initialData = {
    title: "",
    description: "",
    grade: "",
    order: 0,
    isPublished: false,
    thumbnail: null,
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("grade", formData.grade);
      data.append("order", formData.order);
      data.append("isPublished", formData.isPublished);

      if (formData.thumbnail instanceof File) {
        data.append("thumbnail", formData.thumbnail);
      }

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      await createTopic(data);

      toast.success("Topic created successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to create topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="mx-auto max-w-6xl">
        <TopicForm
          title="Add Topic"
          buttonText="Create Topic"
          initialData={initialData}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
