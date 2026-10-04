import React from "react";
import { Link } from "react-router-dom";
import { FileText, FileVideo, Play, Presentation } from "lucide-react";

import { getLessonFile } from "../../lib/lesson";

const base =
  "group relative block h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border-light bg-lesson-orange sm:h-24 sm:w-36";

export function ModuleThumb({ lesson, to }) {
  const { type } = getLessonFile(lesson);
  const TypeIcon =
    type === "video" ? FileVideo : type === "pptx" ? Presentation : FileText;

  const content = (
    <>
      {lesson.thumbnail?.url ? (
        <img
          src={lesson.thumbnail.url}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <TypeIcon
            className="h-8 w-8 text-primary/30"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      )}

      {to && (
        <span className="absolute inset-0 flex items-center justify-center bg-secondary-dark/0 transition-colors duration-200 group-hover:bg-secondary-dark/20">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-dark shadow-[var(--shadow-sm)] transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <Play
              className="ml-0.5 h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            />
          </span>
        </span>
      )}
    </>
  );

  // "Start Learning" is the accessible control; the thumbnail is a
  // mouse-only shortcut, so it stays out of the tab order.
  if (!to) {
    return (
      <span aria-hidden="true" className={`${base} opacity-70`}>
        {content}
      </span>
    );
  }

  return (
    <Link
      to={to}
      tabIndex={-1}
      aria-hidden="true"
      className={`${base} transition-colors duration-200 hover:border-primary/40`}
    >
      {content}
    </Link>
  );
}
