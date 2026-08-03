import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Edit, Trash2, Plus } from "lucide-react";

import { getLessons } from "../../../api/lesson.api";

import { getQuizByLesson, deleteQuiz } from "../../../api/quiz.api";

export default function ManageQuizzes() {
  const [lessons, setLessons] = useState([]);

  const [quizzes, setQuizzes] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);

      const response = await getLessons();

      let lessonList = [];

      if (Array.isArray(response.data)) {
        lessonList = response.data;
      } else if (Array.isArray(response.data?.data)) {
        lessonList = response.data.data;
      }

      setLessons(lessonList);

      const quizMap = {};

      await Promise.all(
        lessonList.map(async (lesson) => {
          try {
            const response = await getQuizByLesson(lesson._id);

            quizMap[lesson._id] = response.data;
          } catch (error) {
            quizMap[lesson._id] = null;
          }
        }),
      );

      setQuizzes(quizMap);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lessonId) => {
    const confirmDelete = window.confirm("Delete this quiz?");

    if (!confirmDelete) return;

    try {
      await deleteQuiz(lessonId);

      toast.success("Quiz deleted");

      setQuizzes((prev) => ({
        ...prev,

        [lessonId]: null,
      }));
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading quizzes...</div>;
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
              Manage Quizzes
            </h1>

            <p
              className="
              mt-2
              text-slate-600
            "
            >
              Create and manage quizzes for lessons.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => {
            const quiz = quizzes[lesson._id];

            return (
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
                    {quiz
                      ? `${quiz.questions?.length || 0} Questions`
                      : "No Quiz Added"}
                  </p>
                </div>

                <div className="flex gap-3">
                  {quiz ? (
                    <>
                      <Link
                        to={`/admin/quizzes/edit/${lesson._id}`}
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
                    </>
                  ) : (
                    <Link
                      to={`/admin/quizzes/add/${lesson._id}`}
                      className="
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-orange-500
                          px-4
                          py-3
                          text-white
                          hover:bg-orange-600
                          "
                    >
                      <Plus size={18} />
                      Add Quiz
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
