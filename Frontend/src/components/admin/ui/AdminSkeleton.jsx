import React from "react";

export function TableSkeleton({ rows = 6, cols = 4 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface animate-pulse">
      <div className="border-b border-border bg-surface-muted/50 p-4">
        <div className="h-4 w-40 rounded-md bg-border/60" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-surface-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded-md bg-surface-muted" />
              <div className="h-3 w-1/2 rounded-md bg-surface-muted/70" />
            </div>
            <div className="hidden sm:block h-6 w-20 rounded-full bg-surface-muted" />
            <div className="h-8 w-24 rounded-lg bg-surface-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCardSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-24 rounded bg-surface-muted" />
            <div className="h-9 w-9 rounded-xl bg-surface-muted" />
          </div>
          <div className="mt-4 h-8 w-20 rounded bg-surface-muted" />
          <div className="mt-2 h-3 w-28 rounded bg-surface-muted/70" />
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 animate-pulse">
      <div className="space-y-2 border-b border-border pb-5">
        <div className="h-6 w-48 rounded bg-surface-muted" />
        <div className="h-4 w-72 rounded bg-surface-muted/70" />
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="h-4 w-24 rounded bg-surface-muted" />
          <div className="h-10 w-full rounded-xl bg-surface-muted" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-28 rounded bg-surface-muted" />
          <div className="h-24 w-full rounded-xl bg-surface-muted" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 rounded-xl bg-surface-muted" />
          <div className="h-10 rounded-xl bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}

export default { TableSkeleton, StatCardSkeleton, FormSkeleton };
