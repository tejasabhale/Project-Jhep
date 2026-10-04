import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import AdminModal from "../ui/AdminModal";
import PublishToggle from "../topic/PublishToggle";
import {
  AdminFormField,
  AdminFormActions,
} from "../ui/AdminFormSection";

export default function TestimonialModal({
  isOpen,
  onClose,
  onSubmit,
  testimonial = null,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5,
    isActive: true,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || "",
        review: testimonial.review || "",
        rating: testimonial.rating || 5,
        isActive: testimonial.isActive ?? true,
      });
    } else {
      setFormData({
        name: "",
        review: "",
        rating: 5,
        isActive: true,
      });
    }
  }, [testimonial, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const review = formData.review.trim();

    if (!name || !review) return;

    onSubmit({
      name,
      review,
      rating: Number(formData.rating),
      isActive: formData.isActive,
    });
  };

  const isEdit = Boolean(testimonial);

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Testimonial" : "Add Testimonial"}
      description={
        isEdit
          ? "Update feedback quote and visibility settings."
          : "Add learner or teacher feedback displayed on the website."
      }
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AdminFormField label="Student / Person Name" required>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Aarav Patil"
            maxLength={100}
            required
            className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </AdminFormField>

        <AdminFormField
          label="Testimonial / Review"
          required
          hint={`${formData.review.length}/500 characters`}
        >
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Enter the quote or feedback..."
            rows={4}
            maxLength={500}
            required
            className="w-full resize-none rounded-xl border border-border bg-background p-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </AdminFormField>

        <AdminFormField label="Star Rating">
          <div className="flex items-center gap-2 py-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    rating: star,
                  }))
                }
                className="p-1 transition hover:scale-110"
              >
                <Star
                  size={22}
                  className={
                    star <= formData.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-border"
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-xs font-bold text-text-secondary">
              {formData.rating} out of 5 stars
            </span>
          </div>
        </AdminFormField>

        <div className="rounded-xl border border-border bg-background p-3.5">
          <PublishToggle
            checked={formData.isActive}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isActive: e.target.checked,
              }))
            }
            title="Active Testimonial"
            description={
              formData.isActive
                ? "This feedback is approved and visible to the public."
                : "This feedback is unapproved and hidden."
            }
          />
        </div>

        <AdminFormActions
          onCancel={onClose}
          loading={loading}
          submitLabel={isEdit ? "Save Changes" : "Create Testimonial"}
        />
      </form>
    </AdminModal>
  );
}
