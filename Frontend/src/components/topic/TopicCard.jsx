import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Reveal from "../ui/Reveal";

export function TopicCard({ topic, index }) {
  const navigate = useNavigate();

  return (
    <Reveal delay={(index % 3) * 90}>
      <article
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-orange-100
          bg-white
          shadow-sm
          shadow-orange-100
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-orange-200/60
        "
      >
        {/* Thumbnail */}

        <div className="relative h-48 w-full overflow-hidden bg-orange-100">
          {topic.thumbnail?.url ? (
            <img
              src={topic.thumbnail.url}
              alt={topic.title}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-7xl">
              📚
            </div>
          )}

          {topic.isPublished && (
            <span
              className="
                absolute
                right-4
                top-4
                rounded-full
                bg-green-500
                px-3
                py-1
                text-xs
                font-semibold
                text-white
                shadow
              "
            >
              Published
            </span>
          )}
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-slate-800">{topic.title}</h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {topic.description ||
              "Learn English through fun lessons, conversations, quizzes and activities."}
          </p>

          <div className="mt-auto">
            <div className="mt-5 flex items-center gap-2">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-orange-100
                  bg-orange-50
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-orange-700
                "
              >
                <GraduationCap size={14} />
                {topic.grade}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <BookOpen className="h-4 w-4 text-orange-500" />
              Interactive Lessons
            </div>

            <button
              onClick={() => navigate(`/topics/${topic._id}/lessons`)}
              className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-orange-500
                py-3
                font-semibold
                text-white
                transition
                hover:bg-orange-600
              "
            >
              Start Learning
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
