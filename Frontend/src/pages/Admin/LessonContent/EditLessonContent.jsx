import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import ContentForm from "../../../components/admin/lessonContent/ContentForm";

import {
  getLessonContents,
  updateLessonContent,
} from "../../../api/lessonContent.api";

export default function EditLessonContent() {
  const { lessonId, contentId } = useParams();

  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setPageLoading(true);

      const response = await getLessonContents(lessonId);

      const contents = response.data?.contents || [];

      const content = contents.find((item) => item._id === contentId);

      if (!content) {
        throw new Error("Content not found");
      }

      setInitialData({
        title: content.title || "",

        blockType: content.blockType || "ppt",

        fileUrl: content.file?.url || "",

        fileName: content.file?.fileName || "",

        order: content.order || 1,
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to load content");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await updateLessonContent(contentId, data);

      toast.success("Content updated successfully");

      navigate(`/admin/lesson-content/manage/${lessonId}`);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="p-6 text-center">Loading content...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          Edit Lesson Content
        </h1>

        <ContentForm
          lessonId={lessonId}
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          buttonText="Update Content"
        />
      </div>
    </div>
  );
}
