import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ContentForm from "../../../components/admin/lessonContent/ContentForm";

export default function AddLessonContent() {
  const { lessonId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      // ContentForm already handles API
      // when no custom onSubmit is passed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
    min-h-screen
    bg-orange-50
    p-6
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
        mb-6
        "
        >
          <h1
            className="
          text-3xl
          font-bold
          text-slate-800
          "
          >
            Add Lesson Content
          </h1>

          <p
            className="
          mt-2
          text-slate-600
          "
          >
            Add PPT, PDF or video resources.
          </p>
        </div>

        <ContentForm
          lessonId={lessonId}
          onSuccess={() => {
            toast.success("Content added successfully");

            navigate(`/admin/lesson-content/manage/${lessonId}`);
          }}
        />
      </div>
    </div>
  );
}
