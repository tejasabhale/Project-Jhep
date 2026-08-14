import { MessageSquareQuote, Star, Sparkles, Eye, EyeOff } from "lucide-react";

const TestimonialStats = ({ testimonials = [] }) => {
  const total = testimonials.length;

  const averageRating =
    total > 0
      ? (
          testimonials.reduce(
            (sum, testimonial) => sum + (Number(testimonial.rating) || 0),
            0,
          ) / total
        ).toFixed(1)
      : "0.0";

  const fiveStarReviews = testimonials.filter(
    (testimonial) => Number(testimonial.rating) === 5,
  ).length;

  const activeTestimonials = testimonials.filter(
    (testimonial) => testimonial.isActive === true,
  ).length;

  const inactiveTestimonials = total - activeTestimonials;

  const stats = [
    {
      title: "Total Testimonials",
      value: total,
      icon: MessageSquareQuote,
      description: "All testimonials",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: Star,
      description: "Out of 5.0",
    },
    {
      title: "5-Star Reviews",
      value: fiveStarReviews,
      icon: Sparkles,
      description: "Excellent feedback",
    },
    {
      title: "Active",
      value: activeTestimonials,
      icon: Eye,
      description: `${inactiveTestimonials} inactive`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h3
                  className="mt-2 text-2xl font-semibold text-gray-900"
                  style={{
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  {stat.value}
                </h3>

                <p className="mt-1 text-xs text-gray-400">{stat.description}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestimonialStats;
