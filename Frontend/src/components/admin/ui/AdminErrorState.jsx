import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function AdminErrorState({
  title = "Unable to load data",
  message = "Something went wrong while retrieving records. Please check your network connection and try again.",
  onRetry,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-error/20 bg-error-light/30 px-6 py-12 text-center ${className}`}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-error-light text-error">
        <AlertCircle size={24} strokeWidth={2} />
      </div>

      <h3 className="mt-4 font-display text-base font-bold text-text-primary">
        {title}
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-text-secondary">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary shadow-xs hover:bg-surface-muted transition"
        >
          <RotateCcw size={15} />
          Try Again
        </button>
      )}
    </div>
  );
}
