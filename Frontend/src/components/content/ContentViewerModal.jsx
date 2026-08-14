import React, { useEffect, useRef } from "react";
import {
  FileText,
  FileVideo,
  Maximize,
  Minimize,
  X,
} from "lucide-react";
import { useFullscreen } from "../../hooks/useFullscreen";

export function ContentViewerModal({ activeItem, onClose }) {
  const modalRef = useRef(null);

  const [isModalFullscreen, toggleModalFullscreen] =
    useFullscreen(modalRef);

  useEffect(() => {
    if (
      !activeItem &&
      document.fullscreenElement === modalRef.current
    ) {
      document.exitFullscreen().catch(() => {});
    }
  }, [activeItem]);

  if (!activeItem) {
    return null;
  }

  const isVideo =
    activeItem.kind === "file" &&
    activeItem.type === "video";

  const isPptx =
    activeItem.kind === "file" &&
    activeItem.type === "pptx";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ${
          isModalFullscreen
            ? "h-full max-w-none rounded-none"
            : "max-w-5xl"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              {activeItem.title}
            </p>

            <h2 className="truncate text-lg font-bold text-slate-800">
              {activeItem.name}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={toggleModalFullscreen}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              title={
                isModalFullscreen
                  ? "Exit Fullscreen"
                  : "Enter Fullscreen"
              }
            >
              {isModalFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              title="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={`bg-slate-900 ${
            isModalFullscreen
              ? "flex-1"
              : "aspect-video"
          }`}
        >
          {isVideo && activeItem.url && (
            <iframe
              src={activeItem.url}
              title={activeItem.name}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}

          {isPptx && activeItem.url && (
            <iframe
              src={activeItem.url}
              title={activeItem.name}
              className="h-full w-full border-0"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            />
          )}

          {!activeItem.url && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
              {isVideo ? (
                <FileVideo className="h-10 w-10" />
              ) : (
                <FileText className="h-10 w-10" />
              )}

              <p className="text-sm">
                Content URL is not available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}