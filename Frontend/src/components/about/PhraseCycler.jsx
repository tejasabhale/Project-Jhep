import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function PhraseCycler({ phrases }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, 2600);

    return () => clearInterval(id);
  }, [phrases.length, reduce]);

  const pair = phrases[index];

  return (
    <div className="relative h-28 w-full text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={pair.en}
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{
            opacity: 0,
            y: 14,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -14,
            filter: "blur(4px)",
          }}
          transition={{
            duration: 0.5,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <span className="font-display text-3xl font-bold text-text-primary">
            {pair.en}
          </span>

          <span className="mt-2 text-lg font-medium text-primary-dark">
            {pair.mr}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}