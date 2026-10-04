import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import TopicForm from "../../../components/admin/topic/TopicForm";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import { saveTopic } from "../../../api/adminServices";

export default function AddTopic() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialData = {
    title: "",
    description: "",
    order: 1,
    isPublished: false,
    thumbnail: null,
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("order", formData.order);
      data.append("isPublished", formData.isPublished);

      if (formData.thumbnail instanceof File) {
        data.append("thumbnail", formData.thumbnail);
      }

      await saveTopic(data);
      toast.success("Topic created successfully");
      navigate("/admin/topics/manage");
    } catch (error) {
      console.error("Create topic error:", error);
      toast.error(error.response?.data?.message || "Unable to create topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <AdminPageHeader
        title="Create New Topic"
        description="Add a new curriculum topic for students to explore."
        breadcrumbs={[
          { label: "Content", path: "/admin/topics/manage" },
          { label: "Topics", path: "/admin/topics/manage" },
          { label: "Add" },
        ]}
        backLink="/admin/topics/manage"
      />

      <TopicForm
        title="Topic Information"
        buttonText="Create Topic"
        initialData={initialData}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/topics/manage")}
      />
    </div>
  );
}
