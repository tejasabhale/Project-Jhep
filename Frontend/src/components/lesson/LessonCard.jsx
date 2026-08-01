import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Reveal from "../ui/Reveal";

const LessonCard = ({ lesson, index }) => {
  const navigate = useNavigate();

  return (
    <Reveal delay={index * 80}>
      <article
        className="
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-orange-100
          bg-white
          shadow-sm
          transition
          hover:-translate-y-1
          hover:shadow-xl
          flex
          flex-col
        "
      >
        {/* Thumbnail */}
        {lesson.thumbnail?.url ? (
          <img
            src={lesson.thumbnail.url}
            alt={lesson.title}
            className="
              h-52
              w-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              h-52
              flex
              items-center
              justify-center
              bg-orange-100
            "
          >
            <BookOpen className="h-16 w-16 text-orange-500" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-slate-800">{lesson.title}</h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
              line-clamp-3
              flex-1
            "
          >
            {lesson.description || "Learn English through interactive lessons."}
          </p>

          <div className="mt-4 text-sm font-semibold text-orange-600">
            Lesson {lesson.order}
          </div>

          <button
            onClick={() => navigate(`/lessons/${lesson._id}`)}
            className="
              mt-6
              w-full
              rounded-full
              bg-orange-500
              py-3
              font-bold
              text-white
              transition
              hover:bg-orange-600
            "
          >
            Open Lesson
          </button>
        </div>
      </article>
    </Reveal>
  );
};

export default LessonCard;
