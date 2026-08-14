import { useState, useEffect, useRef, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TestimonialCarousel
 * A modern, clean, child-friendly testimonial carousel for an
 * English-learning platform, in an orange & white theme.
 *
 * - 1 card on mobile, 2 on tablet, 3 on laptop/desktop, wider on >1440px
 * - autoplay every 5s, pauses on hover/focus/touch, resumes on leave/blur
 * - true infinite loop via cloned edge slides (no visible jump/reset)
 * - swipe (touch), keyboard (←/→), pagination dots, prev/next buttons
 * - Tailwind CSS only, lucide-react for icons
 */

const TESTIMONIALS = [
  {
    id: 1,
    grade: "Grade 3",
    name: "Aarav Patil",
    message:
      "I enjoy learning English because the activities are fun and easy. My favorite part is the story games!",
  },
  {
    id: 2,
    grade: "Grade 5",
    name: "Meera Iyer",
    message:
      "Every lesson feels like a little adventure. I learned so many new words just by playing and singing along.",
  },
  {
    id: 3,
    grade: "Grade 2",
    name: "Kabir Shah",
    message:
      "I used to feel shy speaking English. Now I practice every day and I don't feel scared anymore!",
  },
  {
    id: 4,
    grade: "Grade 8",
    name: "Ananya Rao",
    message:
      "The stories and quizzes make grammar so much easier to understand. I actually look forward to homework now.",
  },
  {
    id: 5,
    grade: "Grade 4",
    name: "Vivaan Deshmukh",
    message:
      "My favorite thing is the reading badges. I have collected twelve so far and I want to get them all!",
  },
  {
    id: 6,
    grade: "Grade 6",
    name: "Sara Khan",
    message:
      "I like how the lessons use pictures and sounds. It helps me remember new words much faster than before.",
  },
  {
    id: 7,
    grade: "Grade 1",
    name: "Reyansh Nair",
    message:
      "The puppet in the videos makes me laugh. Learning letters and sounds with him is my favorite part of the day.",
  },
];

// Single cohesive orange gradient family used across every card,
// with two subtle tonal variants so the row doesn't feel flat/repetitive
const STICKER_GRADIENTS = [
  "from-[#FF7A1A] to-[#F97316]",
  "from-[#FB923C] to-[#EA580C]",
];

const AUTOPLAY_MS = 5000;
const CLONE_COUNT = 3; // matches max visible cards (desktop)

function useVisibleCount() {
  const getCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

export default function TestimonialCarousel() {
  // Load a modern, friendly font pairing
  useEffect(() => {
    const id = "testimonial-carousel-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const total = TESTIMONIALS.length;
  const visibleCount = useVisibleCount();
  const reducedMotion = usePrefersReducedMotion();

  const extended = [
    ...TESTIMONIALS.slice(-CLONE_COUNT),
    ...TESTIMONIALS,
    ...TESTIMONIALS.slice(0, CLONE_COUNT),
  ];

  const [position, setPosition] = useState(CLONE_COUNT);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);

  const cardWidthPercent = 100 / visibleCount;

  const goNext = useCallback(() => {
    setWithTransition(true);
    setPosition((p) => p + 1);
  }, []);

  const goPrev = useCallback(() => {
    setWithTransition(true);
    setPosition((p) => p - 1);
  }, []);

  const goTo = useCallback((realIndex) => {
    setWithTransition(true);
    setPosition(realIndex + CLONE_COUNT);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    autoplayRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, goNext]);

  // Handle seamless loop reset after transition ends
  const handleTransitionEnd = () => {
    if (position >= total + CLONE_COUNT) {
      setWithTransition(false);
      setPosition(position - total);
    } else if (position < CLONE_COUNT) {
      setWithTransition(false);
      setPosition(position + total);
    }
  };

  // Re-enable transition on next frame after a jump
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };
  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current > threshold) {
      goPrev();
    } else if (touchDeltaX.current < -threshold) {
      goNext();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  const activeRealIndex = (((position - CLONE_COUNT) % total) + total) % total;

  return (
    <section
      className="w-fullpy-16 sm:py-20 px-4 sm:px-8"
      aria-label="Student testimonials"
    >
      <style>{`
        .tc-font-display { font-family: 'Poppins', system-ui, sans-serif; }
        .tc-font-body { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="tc-font-display inline-block px-4 py-1.5 rounded-full bg-[#FFF1E6] text-[#EA580C] font-semibold text-xs sm:text-sm mb-4 tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="tc-font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight">
            Trusted by young learners{" "}
            <span className="text-[#F97316]">everywhere</span>
          </h2>
          <p className="tc-font-body text-[#6B6B6B] text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Real feedback from students building confidence in English, one
            lesson at a time.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative outline-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Student testimonials carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Prev / Next buttons (desktop: sides, mobile: below) */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="hidden sm:flex items-center justify-center absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-[#FFE8D6] shadow-lg shadow-black/5 text-[#1A1A1A] hover:scale-110 hover:shadow-xl hover:border-[#F97316]/40 hover:text-[#F97316] active:scale-95 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="hidden sm:flex items-center justify-center absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-[#FFE8D6] shadow-lg shadow-black/5 text-[#1A1A1A] hover:scale-110 hover:shadow-xl hover:border-[#F97316]/40 hover:text-[#F97316] active:scale-95 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Track viewport */}
          <div
            className="overflow-hidden rounded-[2rem]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${position * cardWidthPercent}%)`,
                transition:
                  withTransition && !reducedMotion
                    ? "transform 650ms cubic-bezier(0.65, 0, 0.35, 1)"
                    : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extended.map((t, i) => {
                const gradientIdx =
                  (((i - CLONE_COUNT) % STICKER_GRADIENTS.length) +
                    STICKER_GRADIENTS.length) %
                  STICKER_GRADIENTS.length;

                return (
                  <div
                    key={`${t.id}-${i}`}
                    className="shrink-0 px-3 sm:px-4 2xl:px-5"
                    style={{ width: `${cardWidthPercent}%` }}
                    aria-hidden={
                      i < CLONE_COUNT || i >= CLONE_COUNT + total
                        ? "true"
                        : undefined
                    }
                  >
                    <TestimonialCard
                      testimonial={t}
                      stickerGradient={STICKER_GRADIENTS[gradientIdx]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div
          className="flex items-center justify-center gap-2.5 mt-8 sm:mt-6"
          role="tablist"
          aria-label="Select testimonial"
        >
          {TESTIMONIALS.map((t, idx) => {
            const isActive = idx === activeRealIndex;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => goTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-[400ms] ease-out focus-visible:ring-4 focus-visible:ring-[#F97316]/30 ${
                  isActive
                    ? "w-8 bg-[#F97316]"
                    : "w-2.5 bg-[#1A1A1A]/15 hover:bg-[#1A1A1A]/30"
                }`}
              />
            );
          })}
        </div>

        {/* Mobile prev/next (below dots, since side buttons are hidden) */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#FFE8D6] shadow-md text-[#1A1A1A] active:scale-95 transition-transform focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#FFE8D6] shadow-md text-[#1A1A1A] active:scale-95 transition-transform focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, stickerGradient }) {
  return (
    <div className="group relative h-full bg-gradient-to-br from-white to-[#FFF7EF] rounded-3xl shadow-sm border border-[#FFE8D6] p-8 pt-10 lg:p-9 lg:pt-11 2xl:p-10 2xl:pt-12 flex flex-col gap-5 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#F97316]/15 hover:border-[#F97316]/30">
      {/* Decorative quote badge */}
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stickerGradient} shadow-md shadow-[#F97316]/25 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3`}
        aria-hidden="true"
      >
        <Quote className="w-7 h-7 text-white fill-white" strokeWidth={1} />
      </div>

      <p className="tc-font-body text-[#4A4A4A] text-base lg:text-[1.05rem] leading-relaxed flex-1">
        "{testimonial.message}"
      </p>

      <div className="pt-4 border-t border-[#F5F5F5]">
        <span className="tc-font-display inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#FFF1E6] text-[#EA580C] mb-2">
          {testimonial.grade}
        </span>
        <p className="tc-font-display text-lg font-semibold text-[#1A1A1A]">
          {testimonial.name}
        </p>
      </div>
    </div>
  );
}
