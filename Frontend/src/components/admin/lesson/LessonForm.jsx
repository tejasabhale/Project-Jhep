import React from "react";
import { Presentation, Video, Link as LinkIcon, FileText } from "lucide-react";
import TopicSelect from "./TopicSelect";
import ThumbnailUpload from "../common/ThumbnailUpload";
import PublishToggle from "../topic/PublishToggle";
import {
  AdminFormSection,
  AdminFormField,
  AdminFormActions,
} from "../ui/AdminFormSection";

export default function LessonForm({
  topics = [],
  form,
  setForm,
  onSubmit,
  loading = false,
  showTopic = true,
  lockedTopic = false,
  onCancel,
  submitLabel = "Save Lesson",
}) {
  if (!form) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnail = (file) => {
    setForm((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleFileType = (type) => {
    setForm((prev) => ({
      ...prev,
      fileType: type,
      fileDuration: type === "pptx" ? "" : prev.fileDuration,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Lesson Information */}
      <AdminFormSection
        title="Lesson Information"
        description="Core identity and topic classification for this lesson."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {showTopic && (
            <div className="sm:col-span-2">
              <AdminFormField label="Topic Module" required>
                <TopicSelect
                  topics={topics}
                  value={form.topic}
                  onChange={handleChange}
                  disabled={lockedTopic}
                />
              </AdminFormField>
            </div>
          )}

          <div className="sm:col-span-2">
            <AdminFormField label="Lesson Title" required>
              <input
                type="text"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                required
                maxLength={150}
                placeholder="e.g. Chapter 1: Introduction to English Verbs"
                className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </AdminFormField>
          </div>

          <AdminFormField
            label="Lesson Order"
            required
            hint="Sequence number within the chosen topic"
          >
            <input
              type="number"
              min={1}
              required
              name="order"
              value={form.order ?? ""}
              onChange={handleChange}
              placeholder="1, 2, 3..."
              className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </AdminFormField>

          <div className="sm:col-span-2">
            <AdminFormField
              label="Description"
              hint={`${(form.description || "").length}/1000 characters`}
            >
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                rows={3}
                maxLength={1000}
                placeholder="Outline what skills or concepts this lesson covers..."
                className="w-full resize-none rounded-xl border border-border bg-background p-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </AdminFormField>
          </div>
        </div>
      </AdminFormSection>

      {/* Lesson Material & File */}
      <AdminFormSection
        title="Learning Material & File"
        description="Attach the lesson slides or video file to be viewed by learners."
      >
        <div className="space-y-4">
          <AdminFormField label="Content Format" required>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleFileType("pptx")}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                  form.fileType === "pptx"
                    ? "border-primary bg-primary-light/40 text-primary-dark ring-1 ring-primary"
                    : "border-border bg-surface hover:bg-surface-muted text-text-secondary"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    form.fileType === "pptx"
                      ? "bg-primary text-white"
                      : "bg-surface-muted text-text-muted"
                  }`}
                >
                  <Presentation size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">
                    PowerPoint Presentation
                  </p>
                  <p className="text-[11px] text-text-muted">
                    .pptx slide deck or viewer link
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleFileType("video")}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                  form.fileType === "video"
                    ? "border-primary bg-primary-light/40 text-primary-dark ring-1 ring-primary"
                    : "border-border bg-surface hover:bg-surface-muted text-text-secondary"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    form.fileType === "video"
                      ? "bg-primary text-white"
                      : "bg-surface-muted text-text-muted"
                  }`}
                >
                  <Video size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">
                    Video Lesson
                  </p>
                  <p className="text-[11px] text-text-muted">
                    MP4 video or streaming URL
                  </p>
                </div>
              </button>
            </div>
          </AdminFormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminFormField label="File / Material Name" required>
              <input
                type="text"
                name="fileName"
                value={form.fileName || ""}
                onChange={handleChange}
                required
                placeholder={
                  form.fileType === "pptx" ? "intro-verbs.pptx" : "verbs-lecture.mp4"
                }
                className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </AdminFormField>

            <AdminFormField label="File Public URL" required>
              <div className="relative">
                <LinkIcon
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="url"
                  name="fileUrl"
                  value={form.fileUrl || ""}
                  onChange={handleChange}
                  required
                  placeholder="https://..."
                  className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </AdminFormField>

            {form.fileType === "video" && (
              <AdminFormField
                label="Video Duration"
                hint="Format e.g. 10:45 or 15 mins"
              >
                <input
                  type="text"
                  name="fileDuration"
                  value={form.fileDuration || ""}
                  onChange={handleChange}
                  placeholder="e.g. 12:30"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </AdminFormField>
            )}
          </div>
        </div>
      </AdminFormSection>

      {/* Thumbnail */}
      <AdminFormSection
        title="Lesson Thumbnail"
        description="Preview card image for students exploring this lesson."
      >
        <div className="max-w-md">
          <ThumbnailUpload
            image={form.thumbnail}
            onChange={handleThumbnail}
            label="Upload Lesson Thumbnail"
          />
        </div>
      </AdminFormSection>

      {/* Publishing Toggle */}
      <AdminFormSection
        title="Visibility"
        description="Control whether students can currently view this lesson."
      >
        <div className="rounded-xl border border-border bg-background p-4">
          <PublishToggle
            checked={Boolean(form.isPublished)}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isPublished: e.target.checked,
              }))
            }
            title="Publish Lesson"
            description={
              form.isPublished
                ? "This lesson is published and accessible to students."
                : "This lesson is unpublished and saved as draft."
            }
          />
        </div>
      </AdminFormSection>

      {/* Form Action Buttons */}
      <AdminFormActions
        onCancel={onCancel}
        loading={loading}
        submitLabel={submitLabel}
      />
    </form>
  );
}
