import { useEffect, useState } from "react";
import {
  MessageSquareQuote,
  User,
  GraduationCap,
  ListOrdered,
} from "lucide-react";

const TestimonialForm = ({
  testimonial,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    review: "",
    name: "",
    grade: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        review: testimonial.review || "",
        name: testimonial.name || "",
        grade: testimonial.grade || "",
        order: testimonial.order ?? 0,
        isActive: testimonial.isActive ?? true,
      });
    } else {
      setFormData({
        review: "",
        name: "",
        grade: "",
        order: 0,
        isActive: true,
      });
    }
  }, [testimonial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedReview = formData.review.trim();
    const trimmedName = formData.name.trim();
    const trimmedGrade = formData.grade.trim();

    if (!trimmedReview || !trimmedName || !trimmedGrade) {
      return;
    }

    onSubmit({
      review: trimmedReview,
      name: trimmedName,
      grade: trimmedGrade,
      order: Number(formData.order) || 0,
      isActive: formData.isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Review */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Student Review
        </label>

        <div className="relative">
          <MessageSquareQuote
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Enter student's testimonial..."
            rows={4}
            maxLength={500}
            required
            className="w-full resize-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <p className="mt-1 text-right text-xs text-gray-400">
          {formData.review.length}/500
        </p>
      </div>

      {/* Student Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Student Name
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Aarav Patil"
            maxLength={100}
            required
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>

      {/* Grade */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Grade
        </label>

        <div className="relative">
          <GraduationCap
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="e.g. Grade 5"
            maxLength={50}
            required
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>

      {/* Display Order */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Display Order
        </label>

        <div className="relative">
          <ListOrdered
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="0"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <p className="mt-1 text-xs text-gray-400">
          Lower numbers appear first.
        </p>
      </div>

      {/* Active Status */}
      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Active Testimonial
          </p>

          <p className="text-xs text-gray-500">
            Show this testimonial on the public website
          </p>
        </div>

        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="h-5 w-5 accent-orange-500"
        />
      </label>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : testimonial
              ? "Update Testimonial"
              : "Add Testimonial"}
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;
