import React from "react";

export function RowSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-4 p-4 motion-safe:animate-pulse sm:p-5"
    >
      <div className="h-20 w-28 shrink-0 rounded-xl bg-surface-muted sm:h-24 sm:w-36" />

      <div className="flex-1 space-y-2.5">
        <div className="h-3 w-24 rounded-full bg-surface-muted" />
        <div className="h-5 w-2/3 rounded-full bg-surface-muted" />
        <div className="h-3 w-1/3 rounded-full bg-surface-muted" />
      </div>

      <div className="hidden h-10 w-32 rounded-full bg-surface-muted sm:block" />
    </div>
  );
}
