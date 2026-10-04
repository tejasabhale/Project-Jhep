import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { EASE } from "../../lib/motion";
import { TopicNav } from "./TopicNav";

const SIDEBAR_WIDTH = 240;

// No side margin: the scroll rail next to the sidebar provides the spacing.
const collapsed = { width: 0, opacity: 0 };
const expanded = { width: SIDEBAR_WIDTH, opacity: 1 };

export function TopicSidebar({
  topics,
  selectedId,
  onSelect,
  totalModules,
  onClose,
}) {
  return (
    // Sticky + overflow live on the same element so sticky positioning still
    // works while the width animates. Desktop only: mobile uses the drawer.
    // Render this directly inside AnimatePresence (no overflow-hidden parent),
    // otherwise the parent becomes the scroll container and sticky breaks.
    <motion.aside
      initial={collapsed}
      animate={expanded}
      exit={collapsed}
      transition={{ duration: 0.3, ease: EASE }}
      className="sticky top-6 hidden max-h-[calc(100svh-3rem)] shrink-0 self-start overflow-y-auto overflow-x-hidden lg:block"
    >
      <div style={{ width: SIDEBAR_WIDTH }}>
        <div className="mb-3 flex items-center justify-between px-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
            Topics
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Hide topics sidebar"
            title="Hide topics sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors duration-200 hover:bg-surface hover:text-secondary"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <TopicNav
          idPrefix="desktop"
          topics={topics}
          selectedId={selectedId}
          onSelect={onSelect}
          totalModules={totalModules}
        />
      </div>
    </motion.aside>
  );
}
