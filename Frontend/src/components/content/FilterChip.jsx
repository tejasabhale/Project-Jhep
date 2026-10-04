import React from "react";
import { motion } from "framer-motion";

export function FilterChip({ active, onClick, children, icon: Icon }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-colors duration-200 focus-visible:outline-offset-2 ${
        active
          ? "border-secondary bg-secondary !text-white"
          : "border-border bg-surface text-text-secondary hover:border-secondary hover:text-secondary"
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </motion.button>
  );
}
