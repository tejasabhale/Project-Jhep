import React, { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Layers } from "lucide-react";

import { EASE } from "../../lib/motion";
import { ModuleRow } from "./ModuleRow";

export function TopicCard({ topic, isOpen, onToggle }) {
  const panelId = useId();

  const lessons = topic.lessons ?? [];
  const moduleCount = lessons.length;
  const fileCount = lessons.filter((lesson) => lesson.file).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-slate-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
      >
        <div className="flex min-w-0 items-center gap-5">
          <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
            {topic.thumbnail?.url ? (
              <img
                src={topic.thumbnail.url}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-400 to-slate-500" />
            )}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-slate-800">
              {topic.title}
            </h3>
            <p className="truncate text-sm text-slate-500">
              {topic.description}
            </p>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-4 text-xs font-medium text-slate-500 sm:flex">
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
            <Layers className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
            {moduleCount} {moduleCount === 1 ? "module" : "modules"}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1">
            {fileCount} {fileCount === 1 ? "file" : "files"}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="relative divide-y divide-slate-100 border-t border-slate-100">
              <AnimatePresence mode="popLayout">
                {lessons.map((lesson, index) => (
                  <ModuleRow
                    key={lesson._id}
                    lesson={lesson}
                    topicId={topic._id}
                    index={index}
                  />
                ))}
              </AnimatePresence>

              {lessons.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-400">
                  No lessons available.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
