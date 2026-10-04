import React from "react";
import { motion } from "framer-motion";
import { ListChecks } from "lucide-react";

import { activityConfig } from "../../data/topicsData";

export function ActivityChip({ activity, onOpen }) {
  const cfg = activityConfig[activity.type] ?? activityConfig.quiz;
  const count = activity.questions ?? 0;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-sm font-semibold ring-1 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 ${cfg.classes}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80">
        <ListChecks className="h-4 w-4" aria-hidden="true" />
      </span>

      <span className="truncate">{activity.name}</span>

      <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium">
        {count} {count === 1 ? "question" : "questions"}
      </span>
    </motion.button>
  );
}
