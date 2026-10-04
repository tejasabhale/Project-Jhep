import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThumbnailUpload from "../common/ThumbnailUpload";
import PublishToggle from "./PublishToggle";
import {
  AdminFormSection,
  AdminFormField,
  AdminFormActions,
} from "../ui/AdminFormSection";

export default function TopicForm({
  initialData,
  onSubmit,
  loading = false,
  title = "Topic Information",
  buttonText = "Save Topic",
  onCancel,
}) {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        title: initialData.title || "",
        description: initialData.description || "",
        order: initialData.order ?? 1,
        thumbnail: initialData.thumbnail || "",
        isPublished: Boolean(initialData.isPublished),
      });
    }
  }, [initialData]);

  if (!form) return null;

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
      order: Number(form.order) || 1,
      isPublished: Boolean(form.isPublished),
    });
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs"
    >
      {/* Basic Information */}
      <AdminFormSection
        title="Basic Information"
        description="Provide the core details for this learning topic."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminFormField label="Topic Title" required>
            <input
              required
              maxLength={150}
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              placeholder="e.g. Grammar, Vocabulary, Phonics"
              className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </AdminFormField>

          <AdminFormField label="Display Order" required hint="Determines the sequence in which topics appear">
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
                rows={4}
                maxLength={1000}
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                placeholder="Describe what students will learn in this topic module..."
                className="w-full resize-none rounded-xl border border-border bg-background p-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </AdminFormField>
          </div>
        </div>
      </AdminFormSection>

      {/* Media / Thumbnail */}
      <AdminFormSection
        title="Topic Thumbnail"
        description="Visual cover image shown in student cards and curriculum overviews."
      >
        <div className="max-w-md">
          <ThumbnailUpload
            image={form.thumbnail}
            onChange={handleImage}
            label="Upload Topic Thumbnail"
          />
        </div>
      </AdminFormSection>

      {/* Publishing & Visibility */}
      <AdminFormSection
        title="Publishing & Visibility"
        description="Manage whether this topic is immediately accessible to learners."
      >
        <div className="rounded-xl border border-border bg-background p-4">
          <PublishToggle
            checked={Boolean(form.isPublished)}
            onChange={handleChange}
          />
        </div>
      </AdminFormSection>

      {/* Actions */}
      <AdminFormActions
        onCancel={onCancel}
        loading={loading}
        submitLabel={buttonText}
      />
    </form>
  );
}
