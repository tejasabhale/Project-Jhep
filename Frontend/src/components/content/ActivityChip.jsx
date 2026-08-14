import React from "react";
import { ListChecks } from "lucide-react";
import { activityConfig } from "../../data/topicsData";

export function ActivityChip({ activity, onOpen }) {
  const cfg = activityConfig[activity.type] ?? activityConfig.quiz;

  return (
    <button
      onClick={onOpen}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1 text-sm font-medium ${cfg.classes} hover:brightness-95 active:scale-[0.98] transition-all cursor-pointer`}
    >
      <ListChecks className="h-3.5 w-3.5" />
      {activity.name}
      <span className="opacity-60">· {activity.questions}q</span>
    </button>
  );
}
