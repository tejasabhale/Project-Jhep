import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  FileText,
  Video,
  Presentation,
} from "lucide-react";

import {
  getLessonContents,
  deleteLessonContent,
} from "../../../api/lessonContent.api";

export default function ManageLessonContent() {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);

  const [contents, setContents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContents();
  }, [lessonId]);

  const loadContents = async () => {
    try {
      setLoading(true);

      const response = await getLessonContents(lessonId);

      const data = response.data || {};

      setLesson(data.lesson || null);

      setContents(data.contents || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load lesson content");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this content?");

    if (!confirmDelete) return;

    try {
      await deleteLessonContent(id);

      toast.success("Content deleted");

      setContents((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const getIcon = (type) => {
    if (type === "video") return <Video size={18} />;

    if (type === "ppt") return <Presentation size={18} />;

    return <FileText size={18} />;
  };

  if (loading) {
    return (
      <div
        className="
      min-h-screen
      bg-orange-50
      flex
      items-center
      justify-center
      "
      >
        Loading content...
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
              Manage Lesson Content
            </h1>

            <p
              className="
            mt-2
            text-slate-600
            "
            >
              {lesson?.title || "Lesson"}
            </p>
          </div>

          <Link
            to={`/admin/lesson-content/add/${lessonId}`}
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-orange-500
            px-5
            py-3
            text-white
            hover:bg-orange-600
            "
          >
            <Plus size={18} />
            Add Content
          </Link>
        </div>

        {contents.length === 0 ? (
          <div
            className="
            rounded-2xl
            bg-white
            p-10
            text-center
            text-slate-500
            shadow-sm
            "
          >
            No content added for this lesson.
          </div>
        ) : (
          <div
            className="
            space-y-4
            "
          >
            {contents.map((content) => (
              <div
                key={content._id}
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
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-100
                      text-orange-600
                      "
                  >
                    {getIcon(content.blockType)}
                  </div>

                  <div>
                    <h2
                      className="
                        font-semibold
                        text-slate-800
                        "
                    >
                      {content.title}
                    </h2>

                    <p
                      className="
                        text-sm
                        text-slate-500
                        "
                    >
                      Type: {content.blockType}
                    </p>

                    <p
                      className="
                        text-sm
                        text-slate-500
                        "
                    >
                      Order: {content.order}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    "
                >
                  {content.file?.url && (
                    <a
                      href={content.file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="
                            rounded-xl
                            bg-orange-50
                            p-3
                            text-orange-600
                            hover:bg-orange-100
                            "
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}

                  <Link
                    to={`/admin/lesson-content/edit/${lessonId}/${content._id}`}
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
                    onClick={() => handleDelete(content._id)}
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
        )}
      </div>
    </div>
  );
}
