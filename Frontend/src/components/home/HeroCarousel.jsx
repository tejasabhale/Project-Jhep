import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
/**
 * Full-screen hero image carousel.
 *
 * Props:
 *  - slides: array of { id, image, eyebrow, title, subtitle, cta: { label, onClick } }
 *  - autoPlay: boolean (default true)
 *  - interval: ms between slides (default 5000)
 *  - height: CSS height value (default "100vh")
 *  - showArrows / showDots: booleans
 */
export default function HeroCarousel({
  slides = defaultSlides,
  autoPlay = true,
  interval = 5000,
  height = "100vh",
  showArrows = true,
  showDots = true,
}) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const containerRef = useRef(null);

  const count = slides.length;

  const goTo = useCallback(
    (nextIndex) => {
      const wrapped = ((nextIndex % count) + count) % count;
      setIndex(wrapped);
    },
    [count],
  );

  const navigate = useNavigate();

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // --- Autoplay ---
  useEffect(() => {
    if (!autoPlay || isDragging || count <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, isDragging, interval, next, count]);

  // --- Keyboard navigation ---
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // --- Drag / swipe handling ---
  const onDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
  };
  const onDragMove = (clientX) => {
    if (!isDragging) return;
    dragDeltaX.current = clientX - dragStartX.current;
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    const threshold = 60;
    if (dragDeltaX.current > threshold) prev();
    else if (dragDeltaX.current < -threshold) next();
    setIsDragging(false);
    dragDeltaX.current = 0;
  };

  const dragOffsetPct = isDragging
    ? (dragDeltaX.current / (containerRef.current?.offsetWidth || 1)) * 100
    : 0;
  const translatePct = -(index * 100) + dragOffsetPct;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none outline-none"
      style={{ height }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseLeave={onDragEnd}
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero image carousel"
    >
      <div
        className="flex h-full"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(${translatePct / count}%)`,
          transition: isDragging
            ? "none"
            : "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id ?? i}
            className="relative h-full shrink-0"
            style={{ width: `${100 / count}%` }}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt={slide.title || ""}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

            <div className="absolute inset-0 flex flex-col items-start justify-end sm:justify-center px-6 sm:px-12 lg:px-20 pb-16 sm:pb-0">
              <div
                className="max-w-xl"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 700ms ease 200ms, transform 700ms ease 200ms",
                }}
              >
                {slide.eyebrow && (
                  <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wide uppercase mb-3">
                    {slide.eyebrow}
                  </p>
                )}
                {slide.title && (
                  <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
                    {slide.title}
                  </h1>
                )}
                {slide.subtitle && (
                  <p className="text-white/85 text-base sm:text-lg mb-6 max-w-md">
                    {slide.subtitle}
                  </p>
                )}
                {slide.cta && (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-orange-600 text-white cursor-pointer px-6 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-orange-700 transition-colors"
                  >
                    {slide.cta.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center hover:bg-white/20 transition-colors text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center hover:bg-white/20 transition-colors text-white"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Autoplay progress bar */}
      {autoPlay && !isHovered && !isDragging && count > 1 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20 z-10">
          <div
            key={index}
            className="h-full bg-white"
            style={{
              animation: `hero-progress ${interval}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes hero-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

const defaultSlides = [
  {
    id: 1,
    image: "https://picsum.photos/seed/hero1/1920/1080",
    eyebrow: "New collection",
    title: "Design without limits",
    subtitle: "Build interfaces that feel effortless, on every screen size.",
    cta: { label: "Get started" },
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/hero2/1920/1080",
    eyebrow: "Featured",
    title: "Where ideas take shape",
    subtitle: "From first sketch to shipped product, all in one place.",
    cta: { label: "Explore now" },
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/hero3/1920/1080",
    eyebrow: "Trusted worldwide",
    title: "Built for scale",
    subtitle: "Millions of moments, delivered fast, wherever you are.",
    cta: { label: "Learn more" },
  },
];
