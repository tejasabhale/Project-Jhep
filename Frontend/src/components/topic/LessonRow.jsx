import React from "react";
import { Clock, CheckCircle2, Lock, ChevronRight } from "lucide-react";

export function LessonRow({ lesson, index, isLast }) {
  const isLocked = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";
  const isCurrent = lesson.status === "in-progress";

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && (
        <span
          className="absolute left-[19px] top-10 bottom-0 w-px border-l-2 border-dashed border-orange-200"
          aria-hidden="true"
        />
      )}
      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 ring-white
        ${isCompleted ? "bg-orange-500 text-white" : isCurrent ? "bg-white text-orange-600 border-2 border-orange-500" : "bg-orange-50 text-orange-300 border border-orange-100"}`}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : isLocked ? (
          <Lock className="w-4 h-4" />
        ) : (
          index + 1
        )}
      </div>

      <button
        type="button"
        disabled={isLocked}
        className={`group flex flex-1 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all
        ${
          isLocked
            ? "border-orange-50 bg-orange-50/40 cursor-not-allowed opacity-70"
            : "border-orange-100 bg-white hover:border-orange-300 hover:bg-orange-50 hover:-translate-y-0.5 hover:shadow-md"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0">{lesson.icon}</span>
          <div className="min-w-0">
            <p
              className={`font-semibold truncate ${isLocked ? "text-slate-400" : "text-slate-800"}`}
            >
              {lesson.title}
            </p>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {lesson.duration} min
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isCompleted && (
            <span className="hidden sm:inline text-[11px] font-semibold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">
              Completed
            </span>
          )}
          {isCurrent && (
            <span className="hidden sm:inline text-[11px] font-semibold text-white bg-orange-500 px-2.5 py-1 rounded-full">
              Continue
            </span>
          )}
          {!isLocked && (
            <ChevronRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
          )}
        </div>
      </button>
    </li>
  );
}
