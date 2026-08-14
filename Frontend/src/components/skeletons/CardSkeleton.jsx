import React from "react";

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6 animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-orange-100 mb-5" />
      <div className="h-5 w-2/3 bg-orange-100 rounded-full mb-3" />
      <div className="h-3 w-full bg-orange-50 rounded-full mb-2" />
      <div className="h-3 w-4/5 bg-orange-50 rounded-full mb-5" />
      <div className="flex gap-2 mb-5">
        <div className="h-6 w-20 bg-orange-100 rounded-full" />
        <div className="h-6 w-24 bg-amber-100 rounded-full" />
      </div>
      <div className="h-11 w-full bg-orange-200 rounded-full" />
    </div>
  );
}
