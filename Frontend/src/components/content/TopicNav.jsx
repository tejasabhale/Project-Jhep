import React from "react";
import { motion } from "framer-motion";

import { SPRING } from "../../lib/motion";

/**
 * The topic list shared by the desktop sidebar and the mobile drawer.
 * `idPrefix` keeps the shared-layout highlight separate per instance.
 */
export function TopicNav({
  topics,
  selectedId,
  onSelect,
  totalModules,
  idPrefix,
}) {
  const items = [
    { id: "all", title: "All topics", count: totalModules },
    ...topics.map((topic) => ({
      id: topic._id,
      title: topic.title,
      count: topic.lessons?.length ?? 0,
    })),
  ];

  return (
    <nav aria-label="Learning topics">
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = selectedId === item.id;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-secondary"
                    : "text-text-secondary hover:bg-surface hover:text-secondary"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${idPrefix}-topic-active`}
                    transition={SPRING}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl border border-border-light bg-surface"
                  >
                    <span className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-1 rounded-r-full bg-primary" />
                  </motion.span>
                )}

                <span className="relative min-w-0 truncate">{item.title}</span>

                <span
                  className={`relative shrink-0 text-xs font-bold ${
                    isActive ? "text-primary-dark" : "text-text-muted"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
