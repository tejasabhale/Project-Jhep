import React from "react";

import { Play, FileText, FileVideo } from "lucide-react";

import { fileConfig } from "../../data/topicsData";

export function ModuleThumb({ lesson, onOpen }) {
  const fileType = lesson.file?.type;

  const cfg = fileConfig[fileType] ?? fileConfig.pptx;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative h-28 w-44 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
      aria-label={`Open ${lesson.file?.name}`}
    >
      {lesson.thumbnail?.url ? (
        <img
          src={lesson.thumbnail.url}
          alt={lesson.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          className={`h-full w-full bg-gradient-to-br ${cfg.thumbGradient}`}
        />
      )}

      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />

      <div
        className={`absolute left-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-lg shadow-sm ring-1 backdrop-blur-sm ${cfg.classes}`}
      >
        {fileType === "video" ? (
          <FileVideo className="h-4 w-4 text-orange-600" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
      </div>

      {fileType === "video" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-md">
            <Play
              className="ml-0.5 h-6 w-6 text-orange-500"
              fill="currentColor"
            />
          </span>
        </span>
      )}

      {fileType === "pptx" && (
        <span className="absolute bottom-2 right-2.5 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700 shadow-sm">
          PPT
        </span>
      )}

      {lesson.file?.duration && (
        <span className="absolute bottom-2 left-2.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {lesson.file.duration}
        </span>
      )}
    </button>
  );
}
