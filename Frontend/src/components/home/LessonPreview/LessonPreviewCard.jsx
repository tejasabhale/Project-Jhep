import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LessonPreviewCard({
  lessonId,
  title = "Introducing Yourself",
  grade = "Grade 1-5",
  description = "Learn common English conversations for introducing yourself.",
  thumbnail = "https://placehold.co/600x400/FFF1E4/EA580C?text=Lesson",
}) {
  const navigate = useNavigate();

  const handleStartLesson = () => {
    navigate(`/login`);
  };

  return (
    <div
      className="group overflow-hidden rounded-2xl border bg-white"
      style={{
        borderColor: "#FBDBBE",
      }}
    >
      <div className="relative h-52 overflow-hidden bg-[#FFF1E4]">
        <img
          src={
            thumbnail ||
            "https://placehold.co/600x400/FFF1E4/EA580C?text=Lesson"
          }
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div
          className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{
            background: "#FFFFFF",
            color: "#C2410C",
          }}
        >
          {grade}
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-1.5">
          <BookOpen
            size={14}
            strokeWidth={1.8}
            style={{
              color: "#EA580C",
            }}
          />

          <span
            className="text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{
              color: "#C2410C",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            English Lesson
          </span>
        </div>

        <h3
          className="mt-3 text-xl font-semibold"
          style={{
            color: "#17213B",
            fontFamily: "'Fraunces', serif",
          }}
        >
          {title}
        </h3>

        <p
          className="mt-2 min-h-[48px] text-sm leading-6"
          style={{
            color: "#6B7280",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {description}
        </p>

        <button
          type="button"
          onClick={handleStartLesson}
          disabled={!lessonId}
          className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFEEE0] px-5 py-3 text-sm font-semibold text-[#C2410C] transition-all duration-300 hover:bg-[#FFD8B8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Start Lesson
          <ArrowRight
            size={17}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}
