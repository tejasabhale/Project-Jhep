import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Edit, Trash2, FileText } from "lucide-react";

import { getLessons, deleteLesson } from "../../../api/lesson.api";

export default function ManageLessons() {
  const [lessons, setLessons] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);

      const response = await getLessons();

      let list = [];

      if (Array.isArray(response.data)) {
        list = response.data;
      } else if (Array.isArray(response.data?.data)) {
        list = response.data.data;
      }

      setLessons(list);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this lesson?");

    if (!confirmDelete) return;

    try {
      await deleteLesson(id);

      toast.success("Lesson deleted");

      setLessons((prev) => prev.filter((lesson) => lesson._id !== id));
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div
        className="
      p-6
      text-center
      "
      >
        Loading lessons...
      </div>
    );
  }

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
      max-w-6xl
      "
      >
        <div
          className="
        mb-8
        flex
        items-center
        justify-between
        "
        >
          <div>
            <h1
              className="
            text-3xl
            font-bold
            text-slate-800
            "
            >
              Manage Lessons
            </h1>

            <p
              className="
            mt-2
            text-slate-600
            "
            >
              Manage lessons created under topics.
            </p>
          </div>

          <Link
            to="/admin/lessons/add"
            className="
            rounded-xl
            bg-orange-500
            px-5
            py-3
            text-white
            hover:bg-orange-600
            "
          >
            Add Lesson
          </Link>
        </div>

        <div
          className="
        space-y-4
        "
        >
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-orange-100
                bg-white
                p-5
                shadow-sm
                "
            >
              <div>
                <h2
                  className="
                  font-semibold
                  text-slate-800
                  "
                >
                  {lesson.title}
                </h2>

                <p
                  className="
                  text-sm
                  text-slate-500
                  "
                >
                  Topic: {lesson.topic?.title || "N/A"}
                </p>

                <p
                  className="
                  text-sm
                  text-slate-500
                  "
                >
                  Order: {lesson.order}
                </p>
              </div>

              <div
                className="
                flex
                gap-3
                "
              >
                {/* Manage Lesson Content */}

                <Link
                  to={`/admin/lesson-content/manage/${lesson._id}`}
                  className="
                    rounded-xl
                    bg-orange-50
                    p-3
                    text-orange-600
                    hover:bg-orange-100
                    "
                  title="Manage Content"
                >
                  <FileText size={18} />
                </Link>

                {/* Edit Lesson */}

                <Link
                  to={`/admin/lessons/edit/${lesson._id}`}
                  className="
                    rounded-xl
                    border
                    border-orange-200
                    p-3
                    text-orange-600
                    hover:bg-orange-50
                    "
                >
                  <Edit size={18} />
                </Link>

                {/* Delete Lesson */}

                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="
                    rounded-xl
                    bg-red-50
                    p-3
                    text-red-600
                    hover:bg-red-100
                    "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
