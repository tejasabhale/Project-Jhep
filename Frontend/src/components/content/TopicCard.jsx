import React from "react";

import { ChevronDown, Layers } from "lucide-react";

import { ModuleRow } from "./ModuleRow";

export function TopicCard({ topic, isOpen, onToggle, onOpenItem }) {
  const lessons = topic.lessons ?? [];

  const moduleCount = lessons.length;

  const fileCount = lessons.filter((lesson) => lesson.file).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-orange-200"
      >
        <div className="flex min-w-0 items-center gap-5">
          <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
            {topic.thumbnail?.url ? (
              <img
                src={topic.thumbnail.url}
                alt={`${topic.title} thumbnail`}
                className="h-full w-full object-cover"
                loading="lazy"
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
            <Layers className="h-3.5 w-3.5 text-slate-600" />
            {moduleCount} modules
          </span>

          <span className="rounded-full bg-slate-100 px-2.5 py-1">
            {fileCount} files
          </span>
        </div>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2.5 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
            {lessons.map((lesson) => (
              <ModuleRow
                key={lesson._id}
                lesson={lesson}
                onOpenItem={onOpenItem}
              />
            ))}

            {lessons.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-400">
                No lessons available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
