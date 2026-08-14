import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import ThumbnailUpload from "./ThumbnailUpload";
import GradeSelect from "./GradeSelect";
import PublishToggle from "./PublishToggle";

export default function TopicForm({
  initialData,
  onSubmit,
  loading,
  title,
  buttonText,
}) {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (file) => {
    setForm((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="overflow-hidden rounded-3xl bg-white shadow-xl"
    >
      <div className="border-b p-8">
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="mt-2 text-slate-500">
          Manage topics for your English Learning Platform.
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        <ThumbnailUpload image={form.thumbnail} onChange={handleImage} />

        <div className="space-y-6 p-8">
          <div>
            <label className="mb-2 block font-medium">Title</label>

            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 outline-none"
            />
          </div>

          <GradeSelect value={form.grade} onChange={handleChange} />

          <div>
            <label className="mb-2 block font-medium">Order</label>

            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 outline-none"
            />
          </div>

          <PublishToggle checked={form.isPublished} onChange={handleChange} />

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
          >
            <Save size={18} />

            {loading ? "Saving..." : buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}
