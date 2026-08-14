import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Pencil, Trash2, RefreshCw } from "lucide-react";

import { getAllTopics, deleteTopic } from "../../../api/topic.api";

export default function Topics() {
  const [topics, setTopics] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [grade, setGrade] = useState("");

  const [refresh, setRefresh] = useState(false);

  const fetchTopics = async () => {
    try {
      setLoading(true);

      const res = await getAllTopics({
        search,
        grade,
      });

      setTopics(res.data.topics || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this topic?");

    if (!confirmDelete) return;

    try {
      await deleteTopic(id);

      fetchTopics();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Topics</h1>

          <p className="text-sm text-slate-500">Manage all learning topics.</p>
        </div>

        <Link
          to="/admin/topics/add"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Topic
        </Link>
      </div>

      {/* Filters */}

      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topic..."
              className="w-full rounded-xl border border-orange-200 py-3 pl-10 pr-4 outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="rounded-xl border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="">All Grades</option>

            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
          </select>

          <button
            onClick={() => setRefresh(!refresh)}
            className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-orange-600 transition hover:bg-orange-100"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={fetchTopics}
            className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading topics...
          </div>
        ) : topics.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No topics found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-orange-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-5 py-4">Thumbnail</th>

                  <th className="px-5 py-4">Title</th>

                  <th className="px-5 py-4">Grade</th>

                  <th className="px-5 py-4">Order</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {topics.map((topic) => (
                  <tr key={topic._id} className="border-t border-orange-100">
                    <td className="px-5 py-4">
                      <img
                        src={
                          topic.thumbnail?.url || "https://placehold.co/80x80"
                        }
                        alt={topic.title}
                        className="h-14 w-14 rounded-lg border object-cover"
                      />
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {topic.title}
                    </td>

                    <td className="px-5 py-4">{topic.grade}</td>

                    <td className="px-5 py-4">{topic.order}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          topic.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {topic.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/topics/edit/${topic._id}`}
                          className="rounded-lg border border-orange-200 p-2 text-orange-600 transition hover:bg-orange-100"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(topic._id)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
