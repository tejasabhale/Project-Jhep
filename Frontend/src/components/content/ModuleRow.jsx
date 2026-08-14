import React from "react";

import { ExternalLink, Play } from "lucide-react";

import { fileConfig } from "../../data/topicsData";

import { ModuleThumb } from "./ModuleThumb";

export function ModuleRow({ lesson, onOpenItem }) {
  const fileType = lesson.file?.type;

  const config = fileConfig[fileType] ?? fileConfig.pptx;

  const content = {
    kind: "file",
    title: lesson.title,
    name: lesson.file?.name,
    type: lesson.file?.type,
    url: lesson.file?.url,
    duration: lesson.file?.duration,
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-colors hover:border-slate-300 sm:flex-row sm:items-center">
      <ModuleThumb lesson={lesson} onOpen={() => onOpenItem(content)} />

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="truncate text-base font-semibold text-slate-800">
          {lesson.title}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          {config?.label ?? "File"} · {lesson.file?.name}
        </p>

        {lesson.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
            {lesson.description}
          </p>
        )}

        {lesson.file?.duration && (
          <p className="mt-2 text-xs text-slate-400">{lesson.file.duration}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onOpenItem(content)}
        disabled={!lesson.file?.url}
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Play size={16} />
        Start Learning
      </button>
    </div>
  );
}
