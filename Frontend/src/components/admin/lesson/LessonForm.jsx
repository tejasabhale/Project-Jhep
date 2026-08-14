import { FileVideo, Link, Presentation, Save } from "lucide-react";

import TopicSelect from "./TopicSelect";
import ThumbnailUpload from "../common/ThumbnailUpload";

export default function LessonForm({
  topics = [],
  form,
  setForm,
  onSubmit,
  loading,
  showTopic = true,
}) {
  if (!form) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnail = (file) => {
    setForm((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {showTopic && (
        <TopicSelect
          topics={topics}
          value={form.topic}
          onChange={handleChange}
        />
      )}

      {/* Lesson Title */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Lesson Title
          <span className="ml-1 text-red-500">*</span>
        </label>

        <input
          type="text"
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          required
          maxLength={150}
          placeholder="Example: Introduction to English"
          className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Description
        </label>

        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          rows={4}
          maxLength={1000}
          placeholder="Enter lesson description..."
          className="w-full resize-none rounded-xl border border-orange-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />

        <p className="mt-1 text-right text-xs text-slate-400">
          {(form.description || "").length}/1000
        </p>
      </div>

      {/* Lesson Order */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Lesson Order
          <span className="ml-1 text-red-500">*</span>
        </label>

        <input
          type="number"
          min={1}
          name="order"
          value={form.order ?? ""}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      {/* Lesson File */}
      <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-800">Lesson File</h3>

          <p className="mt-1 text-sm text-slate-500">
            Add or update the presentation or video associated with this lesson.
          </p>
        </div>

        {/* File Type */}
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {/* PPTX */}
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                fileType: "pptx",
                fileDuration: "",
              }))
            }
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
              form.fileType === "pptx"
                ? "border-orange-500 bg-white ring-2 ring-orange-100"
                : "border-orange-200 bg-white hover:border-orange-300"
            }`}
          >
            <div
              className={`rounded-xl p-3 ${
                form.fileType === "pptx"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Presentation size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-800">PowerPoint</p>

              <p className="text-xs text-slate-500">PPTX presentation</p>
            </div>
          </button>

          {/* Video */}
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                fileType: "video",
              }))
            }
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
              form.fileType === "video"
                ? "border-orange-500 bg-white ring-2 ring-orange-100"
                : "border-orange-200 bg-white hover:border-orange-300"
            }`}
          >
            <div
              className={`rounded-xl p-3 ${
                form.fileType === "video"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <FileVideo size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-800">Video</p>

              <p className="text-xs text-slate-500">Video content</p>
            </div>
          </button>
        </div>

        <div className="space-y-5">
          {/* File Name */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              File Name
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              name="fileName"
              value={form.fileName || ""}
              onChange={handleChange}
              required
              placeholder={
                form.fileType === "pptx" ? "lesson.pptx" : "lesson.mp4"
              }
              className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* File URL */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
              <Link size={16} />
              File URL
              <span className="text-red-500">*</span>
            </label>

            <input
              type="url"
              name="fileUrl"
              value={form.fileUrl || ""}
              onChange={handleChange}
              required
              placeholder="https://..."
              className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Enter the publicly accessible URL of the PPTX or video.
            </p>
          </div>

          {/* Video Duration */}
          {form.fileType === "video" && (
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Video Duration
              </label>

              <input
                type="text"
                name="fileDuration"
                value={form.fileDuration || ""}
                onChange={handleChange}
                placeholder="Example: 12:35"
                className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      <div>
        <ThumbnailUpload image={form.thumbnail} onChange={handleThumbnail} />
      </div>

      {/* Publish */}
      <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={Boolean(form.isPublished)}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isPublished: e.target.checked,
              }))
            }
            className="h-4 w-4 rounded border-orange-300 text-orange-500 focus:ring-orange-500"
          />

          <div>
            <p className="font-medium text-slate-800">Publish Lesson</p>

            <p className="text-sm text-slate-500">
              Published lessons are visible to students.
            </p>
          </div>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save size={18} />

        {loading ? "Saving..." : "Save Lesson"}
      </button>
    </form>
  );
}
