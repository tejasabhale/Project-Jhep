import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllTopics } from "../../../api/topic.api";
import { createLesson } from "../../../api/lesson.api";

import LessonHeader from "../../../components/admin/lesson/LessonHeader";
import LessonForm from "../../../components/admin/lesson/LessonForm";

const initialForm = {
  topic: "",
  title: "",
  description: "",
  order: 1,
  isPublished: false,
  thumbnail: null,
};

export default function AddLesson() {
  const [topics, setTopics] = useState([]);
  const [topicLoading, setTopicLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setTopicLoading(true);

      const { data } = await getAllTopics();

      const topicList =
        data?.data?.topics || data?.data || data?.topics || data || [];

      setTopics(
        topicList.map((topic) => ({
          _id: topic._id ?? topic.id,
          title: topic.title,
        })),
      );
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load topics.");

      setTopics([]);
    } finally {
      setTopicLoading(false);
    }
  };

  const handleSubmit = async (form) => {
    if (!form.topic) {
      return toast.error("Please select a topic.");
    }

    if (!form.title.trim()) {
      return toast.error("Lesson title is required.");
    }

    const toastId = toast.loading("Creating lesson...");

    try {
      setLoading(true);

      const data = new FormData();

      data.append("topicId", form.topic);
      data.append("title", form.title.trim());
      data.append("description", form.description.trim());
      data.append("order", Number(form.order));
      data.append("isPublished", form.isPublished);

      if (form.thumbnail instanceof File) {
        data.append("thumbnail", form.thumbnail);
      }

      await createLesson(data);

      toast.success("Lesson created successfully!", {
        id: toastId,
      });

      setForm(initialForm);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create lesson.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-orange-50
        via-white
        to-orange-100
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-4xl
        "
      >
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-orange-100
            bg-white
            shadow-xl
          "
        >
          <div
            className="
              border-b
              border-orange-100
              bg-gradient-to-r
              from-orange-50
              to-white
              p-8
            "
          >
            <LessonHeader />
          </div>

          <div className="p-8">
            {topicLoading ? (
              <div
                className="
                  flex
                  items-center
                  justify-center
                  py-20
                  text-slate-500
                "
              >
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
      </div>
    </div>
  );
}
