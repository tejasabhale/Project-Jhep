import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FALLBACK_THUMBNAIL =
  "https://placehold.co/600x400/FFF1E4/EA580C?text=Lesson";

export default function LessonPreviewCard({
  lessonId,
  title = "Introducing Yourself",
  description = "Learn common English conversations for introducing yourself.",
  thumbnail = FALLBACK_THUMBNAIL,
}) {
  const navigate = useNavigate();

  const handleStartLesson = () => {
    navigate("/login");
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-dark-surface shadow-[var(--shadow-md)] transition-colors duration-300 hover:border-primary/40">
      {/* Top accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* Thumbnail */}
      <div className="relative h-52 shrink-0 overflow-hidden bg-secondary">
        <img
          src={thumbnail || FALLBACK_THUMBNAIL}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Soft bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-bg/40 to-transparent"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center gap-1.5">
          <BookOpen
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
            className="text-primary"
          />

          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-light">
            English Lesson
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-dark-text transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-2 flex-1 font-sans text-sm leading-6 text-dark-muted">
          {description}
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={handleStartLesson}
          disabled={!lessonId}
          className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-dark active:scale-[0.98] focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary"
        >
          <span className="text-white">Start Lesson</span>

          <ArrowRight
            size={17}
            strokeWidth={2}
            aria-hidden="true"
            className="text-white transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
}
