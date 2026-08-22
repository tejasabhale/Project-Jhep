import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { getAllTestimonials } from "../../api/testimonial.api";

export default function StudentTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getAllTestimonials();

        if (Array.isArray(response?.data)) {
          // Only show active testimonials on the public website
          const activeTestimonials = response.data.filter(
            (testimonial) => testimonial.isActive === true,
          );

          setTestimonials(activeTestimonials);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{
                background: "#FFEEE0",
                color: "#C2410C",
              }}
            >
              Student Voices
            </span>

            <h2
              className="mt-5 text-2xl font-semibold md:text-[2.25rem]"
              style={{
                color: "#17213B",
                fontFamily: "'Fraunces', serif",
              }}
            >
              What Our{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF7A30, #EA580C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Students Say
              </span>
            </h2>
          </div>

          <div
            className="h-72 animate-pulse rounded-[2rem] border"
            style={{
              borderColor: "#FBDBBE",
              background: "#FFF4E9",
            }}
          />
        </div>
      </section>
    );
  }

  // Don't render the section if there are no active testimonials
  if (!testimonials.length) {
    return null;
  }

  const testimonial = testimonials[current];

  const rating = Math.min(5, Math.max(1, Number(testimonial.rating) || 5));

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
            style={{
              background: "#FFEEE0",
              color: "#C2410C",
            }}
          >
            Words That Inspire
          </span>

          <h2
            className="mt-5 text-2xl font-semibold md:text-[2.25rem] md:leading-[1.15]"
            style={{
              color: "#17213B",
              fontFamily: "'Fraunces', serif",
            }}
          >
            Voices That{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF7A30, #EA580C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Inspire Change
            </span>
          </h2>

          <p
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base"
            style={{
              color: "#5B6472",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Small steps in learning can make a big difference. Here is what
            students are saying about their learning journey with Project Jhep.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[2rem] border p-7 md:p-10"
            style={{
              borderColor: "#FBDBBE",
              background: "#FFF7F1",
              boxShadow: "0 12px 30px -24px rgba(23, 33, 59, 0.22)",
            }}
          >
            {/* Quote Icon */}
            <div
              className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-xl md:right-10 md:top-10"
              style={{
                background: "#FFEEE0",
              }}
            >
              <Quote
                size={21}
                strokeWidth={2}
                style={{
                  color: "#EA580C",
                }}
              />
            </div>

            {/* Rating */}
            <div className="mb-6 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill={star <= rating ? "#F97316" : "transparent"}
                  strokeWidth={star <= rating ? 0 : 1.5}
                  style={{
                    color: "#F97316",
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div
              key={testimonial._id}
              className="animate-[fadeIn_0.4s_ease-in-out]"
            >
              <blockquote
                className="max-w-3xl text-xl font-medium leading-relaxed md:text-2xl"
                style={{
                  color: "#17213B",
                  fontFamily: "'Fraunces', serif",
                }}
              >
                “{testimonial.review}”
              </blockquote>

              {/* Student Info */}
              <div className="mt-7 flex items-center gap-3">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      background: "linear-gradient(135deg, #FF7A30, #EA580C)",
                      color: "#FFFFFF",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {testimonial.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                <div>
                  <h3
                    className="text-sm font-semibold"
                    style={{
                      color: "#17213B",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {testimonial.name}
                  </h3>

                  <p
                    className="mt-0.5 text-xs"
                    style={{
                      color: "#8A93A3",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {testimonial.grade}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: current === index ? "24px" : "7px",
                      background: current === index ? "#EA580C" : "#FBD0AD",
                    }}
                  />
                ))}
              </div>

              {/* Previous / Next */}
              {testimonials.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all duration-200 hover:border-orange-300 hover:bg-orange-50"
                    style={{
                      borderColor: "#FBDBBE",
                      color: "#C2410C",
                    }}
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all duration-200 hover:border-orange-300 hover:bg-orange-50"
                    style={{
                      borderColor: "#FBDBBE",
                      color: "#C2410C",
                    }}
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p
          className="mt-5 text-center text-xs"
          style={{
            color: "#8A93A3",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Learning English, one conversation at a time.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.4s_ease-in-out\\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
