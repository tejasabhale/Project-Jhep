import { Save } from "lucide-react";

import TopicSelect from "./TopicSelect";
import ThumbnailUpload from "./ThumbnailUpload";

export default function LessonForm({
  topics = [],
  form,
  setForm,
  onSubmit,
  loading,
  showTopic = true,
}) {
  if (!form) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showTopic && (
        <TopicSelect
          topics={topics}
          value={form.topic}
          onChange={handleChange}
        />
      )}

      <div>
        <label className="mb-2 block font-medium">Lesson Title</label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Example: Introduction to English"
          className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Lesson Order</label>

        <input
          type="number"
          min={1}
          name="order"
          value={form.order}
          onChange={handleChange}
          className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <ThumbnailUpload
        file={form.thumbnail}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            thumbnail: e.target.files?.[0] || null,
          }))
        }
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.isPublished}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              isPublished: e.target.checked,
            }))
          }
        />

        <label>Publish Lesson</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save size={18} />
        {loading ? "Saving..." : "Save Lesson"}
      </button>
    </form>
  );
}
