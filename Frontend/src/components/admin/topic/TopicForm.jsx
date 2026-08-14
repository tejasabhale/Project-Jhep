import { useEffect, useState } from "react";
import { Save, ImagePlus } from "lucide-react";

import ThumbnailUpload from "../common/ThumbnailUpload";
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
      setForm({
        ...initialData,
        title: initialData.title || "",
        description: initialData.description || "",
        order: initialData.order ?? "",
        thumbnail: initialData.thumbnail || "",
        isPublished: Boolean(initialData.isPublished),
      });
    }
  }, [initialData]);

  if (!form) {
    return null;
  }

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

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      order: Number(form.order),
      isPublished: Boolean(form.isPublished),
    });
  };

  return (
    <form
      onSubmit={submit}
      className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg"
    >
      {/* Header */}
      <div className="border-b border-orange-100 px-6 py-6 sm:px-8">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        <p className="mt-1.5 text-sm text-slate-500">
          Update the topic details, thumbnail, order, and publication status.
        </p>
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* Thumbnail */}
        <div className="border-b border-orange-100 bg-orange-50/40 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="mb-4">
            <h3 className="flex items-center gap-2 font-semibold text-slate-800">
              <ImagePlus size={18} className="text-orange-500" />
              Topic Thumbnail
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Upload an image to represent this topic.
            </p>
          </div>

          <ThumbnailUpload image={form.thumbnail} onChange={handleImage} />
        </div>

        {/* Form */}
        <div className="space-y-6 p-6 sm:p-8">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Topic Title
            </label>

            <input
              required
              maxLength={150}
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              placeholder="Example: Basic English"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              maxLength={1000}
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Describe what students will learn..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {(form.description || "").length}/1000
            </p>
          </div>

          {/* Order */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Display Order
            </label>

            <input
              type="number"
              min={1}
              name="order"
              value={form.order ?? ""}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Publish */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <PublishToggle
              checked={Boolean(form.isPublished)}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {loading ? "Updating Topic..." : buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}
