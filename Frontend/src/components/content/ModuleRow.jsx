import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  FileText,
  FileVideo,
  Presentation,
} from "lucide-react";

import { fileConfig } from "../../data/topicsData";
import { getLessonFile, getQuizId, getQuizPath } from "../../lib/lesson";
import { EASE, staggerDelay } from "../../lib/motion";
import { ModuleThumb } from "./ModuleThumb";

const startBtn =
  "inline-flex min-h-10 w-full items-center justify-center rounded-full bg-primary-dark px-5 py-2.5 text-sm font-bold !text-white transition-colors duration-200 hover:bg-primary sm:w-auto";

const quizBtn =
  "inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-secondary transition-colors duration-200 hover:border-primary hover:text-primary-dark sm:w-auto";

export function ModuleRow({ lesson, topicId, index = 0 }) {
  const file = getLessonFile(lesson);
  const config = fileConfig[file.type] ?? fileConfig.pptx;

  /*
   * IMPORTANT:
   * This route must match AppRoutes:
   *
   * /lesson/:topicId/:lessonId
   */
  const lessonPath =
    topicId && lesson?._id ? `/lesson/${topicId}/${lesson._id}` : null;

  const quizId = getQuizId(lesson);
  const quizPath = quizId ? getQuizPath(quizId) : null;

  const isVideo = file.type === "video";
  const isPptx = file.type === "pptx";

  const FileIcon = isVideo ? FileVideo : isPptx ? Presentation : FileText;

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 14 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: EASE,
          delay: staggerDelay(index),
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.15,
        },
      }}
      className="flex flex-col gap-4 bg-surface px-4 py-4 transition-colors duration-200 hover:bg-background sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-5"
    >
      {/* Thumbnail + details */}
      <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
        {lessonPath ? (
          <ModuleThumb lesson={lesson} to={lessonPath} />
        ) : (
          <div className="h-20 w-28 shrink-0 rounded-xl bg-surface-muted sm:h-24 sm:w-36" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-primary-dark">
              <FileIcon className="h-3.5 w-3.5" aria-hidden="true" />

              {config?.label ?? "File"}
            </span>

            {file.duration && (
              <>
                <span className="text-text-muted" aria-hidden="true">
                  ·
                </span>

                <span className="text-xs font-medium text-text-muted">
                  {file.duration}
                </span>
              </>
            )}
          </div>

          <h3 className="mt-1 font-display text-base font-bold leading-snug text-secondary sm:text-lg">
            {lesson.title}
          </h3>

          {lesson.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-secondary sm:line-clamp-1">
              {lesson.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        {quizPath && (
          <motion.div whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              to={quizPath}
              className={quizBtn}
              aria-label={`Take quiz: ${lesson.title}`}
            >
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Take Quiz
            </Link>
          </motion.div>
        )}

        {lessonPath && (
          <motion.div whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              to={lessonPath}
              className={startBtn}
              aria-label={`Start learning: ${lesson.title}`}
            >
              Start Learning
            </Link>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
