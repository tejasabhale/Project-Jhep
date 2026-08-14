import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Edit, Trash2 } from "lucide-react";

import { getAllTopics, deleteTopic } from "../../../api/topic.api";

export default function ManageTopics() {
  const [topics, setTopics] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);

      const response = await getAllTopics();

      let list = [];

      if (Array.isArray(response.data?.topics)) {
        list = response.data.topics;
      } else if (Array.isArray(response.data?.data?.topics)) {
        list = response.data.data.topics;
      } else if (Array.isArray(response.data)) {
        list = response.data;
      }

      setTopics(list);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this topic and all lessons?");

    if (!confirm) return;

    try {
      await deleteTopic(id);

      toast.success("Topic deleted successfully");

      setTopics((prev) => prev.filter((topic) => topic._id !== id));
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading topics...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-6xl">
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
              Manage Topics
            </h1>

            <p className="mt-2 text-slate-600">
              Edit or delete learning topics.
            </p>
          </div>

          <Link
            to="/admin/topics/add"
            className="
            rounded-xl
            bg-orange-500
            px-5
            py-3
            text-white
            hover:bg-orange-600
            "
          >
            Add Topic
          </Link>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic._id}
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
              <div className="flex items-center gap-4">
                {topic.thumbnail?.url && (
                  <img
                    src={topic.thumbnail.url}
                    alt={topic.title}
                    className="
                      h-16
                      w-16
                      rounded-xl
                      object-cover
                      "
                  />
                )}

                <div>
                  <h2
                    className="
                    font-semibold
                    text-slate-800
                    "
                  >
                    {topic.title}
                  </h2>

                  <p
                    className="
                    text-sm
                    text-slate-500
                    "
                  >
                    Grade: {topic.grade}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/admin/topics/edit/${topic._id}`}
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
                  onClick={() => handleDelete(topic._id)}
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
