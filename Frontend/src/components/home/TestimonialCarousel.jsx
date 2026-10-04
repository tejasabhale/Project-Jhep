import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, User } from "lucide-react";

import { getAllTestimonials } from "../../api/testimonial.api";

const EASE = [0.22, 1, 0.36, 1];
const INTERVAL = 5000;

/* Largest first, so the smaller circles stack on top of the larger ones */
const ARC_RADII = [170, 130, 90, 50];

/* Solid filled quarter-circles centered on a card corner, in --primary at low opacity */
function Arcs({ className, cx, cy }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute h-44 w-44 md:h-56 md:w-56 ${className}`}
    >
      {ARC_RADII.map((r) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          className="fill-primary"
          fillOpacity="0.04"
        />
      ))}
    </svg>
  );
}

function SectionHeader() {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="inline-block rounded-full border border-border bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">
        Words That Inspire
      </span>

      <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-secondary sm:text-4xl md:text-5xl">
        Voices That <span className="text-primary">Inspire Change</span>
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary md:text-base md:leading-8">
        Small steps in learning can make a big difference. Here are a few words
        from people who have been part of the Project Jhep journey.
      </p>
    </div>
  );
}

export default function StudentTestimonials() {
  const reduce = useReducedMotion();

  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchTestimonials = async () => {
      try {
        const response = await getAllTestimonials();

        if (active && Array.isArray(response?.data)) {
          // Only show active testimonials on the public website
          const activeTestimonials = response.data.filter(
            (testimonial) => testimonial.isActive === true,
          );

          setTestimonials(activeTestimonials);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        if (active) setTestimonials([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchTestimonials();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1 || paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [testimonials.length, paused]);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const sectionClass =
    "relative overflow-hidden bg-surface px-4 py-16 sm:px-6 sm:py-20 md:py-24";

  if (loading) {
    return (
      <section className={sectionClass}>
        <div className="relative mx-auto max-w-5xl">
          <SectionHeader />
          <div
            role="status"
            aria-label="Loading testimonials"
            className="h-56 animate-pulse rounded-[2rem] border border-border bg-surface-muted"
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
    <section className={sectionClass}>
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <SectionHeader />
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background p-6 shadow-[var(--shadow-md)] md:p-9">
            {/* Corner arcs, only inside this card */}
            <Arcs className="left-0 top-0" cx={0} cy={0} />
            <Arcs className="bottom-0 right-0" cx={200} cy={200} />

            {/* Large faded quote mark */}
            <Quote
              aria-hidden="true"
              size={120}
              strokeWidth={1.5}
              className="pointer-events-none absolute -bottom-4 right-6 text-primary/10"
            />

            {/* Accent bar */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-8 h-12 w-1 rounded-r-full bg-primary"
            />

            {/* Quote icon badge */}
            <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary-dark md:right-8 md:top-8">
              <Quote size={18} strokeWidth={2} aria-hidden="true" />
            </div>

            {/* Rating */}
            <div
              className="relative mb-5 flex gap-1"
              role="img"
              aria-label={`Rated ${rating} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  aria-hidden="true"
                  fill={star <= rating ? "currentColor" : "transparent"}
                  strokeWidth={star <= rating ? 0 : 1.5}
                  className="text-primary"
                />
              ))}
            </div>

            {/* Content: fixed min height so the card doesn't jump between slides */}
            <div className="relative min-h-[11rem] md:min-h-[9rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <blockquote className="max-w-3xl font-display text-lg font-semibold leading-relaxed text-secondary md:text-2xl md:leading-relaxed">
                    “{testimonial.review}”
                  </blockquote>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-primary-light text-primary-dark">
                      <User size={17} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <h3 className="text-sm font-semibold text-secondary md:text-base">
                      {testimonial.name}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="relative mt-8 flex items-center justify-between border-t border-border-light pt-5">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={current === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-6 bg-primary"
                        : "w-2 bg-border hover:bg-primary/50"
                    }`}
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-primary-dark transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-primary-dark transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-text-muted">
          Your success story could be next.
        </p>
      </div>
    </section>
  );
}
