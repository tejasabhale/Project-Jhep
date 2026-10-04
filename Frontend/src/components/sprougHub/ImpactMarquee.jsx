import { motion } from "framer-motion";

export default function ImpactMarquee({ items }) {
  const content = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border-light bg-surface-muted py-4">
      <motion.div
        className="flex w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-6 px-4 text-sm font-semibold text-primary-dark"
          >
            {item}
            <span className="text-primary/40">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
