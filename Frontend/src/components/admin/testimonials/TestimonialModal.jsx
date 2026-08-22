import { useEffect, useState } from "react";
import { X, Star, Eye, EyeOff } from "lucide-react";

const TestimonialModal = ({
  isOpen,
  onClose,
  onSubmit,
  testimonial = null,
  loading = false,
}) => {
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

  if (!isOpen) return null;

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

    if (!name || !review) {
      return;
    }

    onSubmit({
      name,
      review,
      rating: Number(formData.rating),
      isActive: formData.isActive,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orange-100 px-6 py-4">
          <div>
            <h2
              className="text-xl font-semibold text-gray-900"
              style={{
                fontFamily: "'Fraunces', serif",
              }}
            >
              {testimonial ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {testimonial
                ? "Update testimonial details"
                : "Add a new student testimonial"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              maxLength={100}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Review */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Review
            </label>

            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Enter student's testimonial"
              rows={4}
              maxLength={500}
              required
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {formData.review.length}/500
            </p>
          </div>

          {/* Rating */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Rating
            </label>

            <div className="flex items-center gap-2">
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
                  disabled={loading}
                  className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
                >
                  <Star
                    size={26}
                    className={
                      star <= formData.rating
                        ? "fill-orange-400 text-orange-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}

              <span className="ml-2 text-sm text-gray-500">
                {formData.rating}/5
              </span>
            </div>
          </div>

          {/* Active / Inactive */}
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-orange-200 hover:bg-orange-50/40">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  formData.isActive
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {formData.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {formData.isActive
                    ? "Active Testimonial"
                    : "Inactive Testimonial"}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {formData.isActive
                    ? "This testimonial will be visible on the website."
                    : "This testimonial will be hidden from the website."}
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              disabled={loading}
              className="h-5 w-5 cursor-pointer accent-orange-500"
            />
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
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
      </div>
    </div>
  );
};

export default TestimonialModal;
