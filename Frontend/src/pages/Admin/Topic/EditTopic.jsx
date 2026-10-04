import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import TopicForm from "../../../components/admin/topic/TopicForm";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import { FormSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import { fetchTopicDetails, saveTopic } from "../../../api/adminServices";

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
      const topic = await fetchTopicDetails(topicId);

      if (!topic) {
        throw new Error("Topic not found");
      }

      setInitialData({
        title: topic.title || "",
        description: topic.description || "",
        order: topic.order ?? 1,
        isPublished: Boolean(topic.isPublished),
        thumbnail: topic.thumbnail?.url || null,
      });
    } catch (error) {
      console.error("Load topic error:", error);
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
      data.append("order", String(form.order));
      data.append("isPublished", String(Boolean(form.isPublished)));

      if (form.thumbnail instanceof File) {
        data.append("thumbnail", form.thumbnail);
      }

      await saveTopic(data, topicId);
      toast.success("Topic updated successfully");
      navigate("/admin/topics/manage");
    } catch (error) {
      console.error("Update topic error:", error);
      toast.error(error.response?.data?.message || "Failed to update topic");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <AdminPageHeader
        title={`Edit Topic: ${initialData?.title || ""}`}
        description="Update topic metadata, order, thumbnail, and publication status."
        breadcrumbs={[
          { label: "Content", path: "/admin/topics/manage" },
          { label: "Topics", path: "/admin/topics/manage" },
          { label: "Edit" },
        ]}
        backLink="/admin/topics/manage"
      />

      {initialData && (
        <TopicForm
          title="Topic Details"
          buttonText="Save Changes"
          initialData={initialData}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/topics/manage")}
        />
      )}
    </div>
  );
}
