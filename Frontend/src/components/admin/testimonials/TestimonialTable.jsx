import {
  Edit,
  MessageSquareQuote,
  Star,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const TestimonialTable = ({ testimonials = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="border-b border-orange-100 bg-orange-50/60">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Student
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Grade
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Review
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Rating
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {testimonials.map((testimonial) => (
              <tr
                key={testimonial._id}
                className="transition hover:bg-orange-50/30"
              >
                {/* Student */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <MessageSquareQuote size={18} />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>

                      <p className="text-xs text-gray-500">Student</p>
                    </div>
                  </div>
                </td>

                {/* Grade */}
                <td className="px-6 py-4">
                  <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-600">
                    {testimonial.grade}
                  </span>
                </td>

                {/* Review */}
                <td className="max-w-sm px-6 py-4">
                  <p
                    className="line-clamp-2 text-sm text-gray-600"
                    title={testimonial.review}
                  >
                    "{testimonial.review}"
                  </p>
                </td>

                {/* Rating */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-orange-400 text-orange-400"
                    />

                    <span className="text-sm font-semibold text-gray-700">
                      {testimonial.rating || 5}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {testimonial.isActive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                      <Eye size={14} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                      <EyeOff size={14} />
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(testimonial)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                      title="Edit testimonial"
                    >
                      <Edit size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(testimonial)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete testimonial"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-gray-100 md:hidden">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="p-4 transition hover:bg-orange-50/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <MessageSquareQuote size={18} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>

                  <p className="text-sm text-orange-600">{testimonial.grade}</p>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(testimonial)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                >
                  <Edit size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(testimonial)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              "{testimonial.review}"
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    className={
                      star <= (testimonial.rating || 5)
                        ? "fill-orange-400 text-orange-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {testimonial.isActive ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                  <Eye size={13} />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                  <EyeOff size={13} />
                  Inactive
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialTable;
