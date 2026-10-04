import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import SectionLabel from "./SectionLabel";

function JourneyCard({ item, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const Icon = item.icon;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [25, 0, -25],
  );

  const y = useSpring(cardY, {
    stiffness: 90,
    damping: 24,
  });

  return (
    <motion.article
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div className="group h-full rounded-[2rem] border border-border-light bg-surface p-7 shadow-[var(--shadow-sm)] transition-colors duration-300 hover:border-primary/40 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.tint} text-primary-dark`}
          >
            <Icon size={25} />
          </div>

          <span className="font-display text-5xl font-extrabold leading-none text-primary/10">
            0{index + 1}
          </span>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-primary-dark">
          {item.label}
        </p>

        <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-secondary md:text-3xl">
          {item.heading}
        </h3>

        <p className="mt-4 text-base leading-7 text-text-secondary">
          {item.description}
        </p>

        <div className="mt-7 h-px bg-border-light" />

        <div className="mt-4 text-sm font-semibold text-secondary">
          Creating lasting change
        </div>
      </div>
    </motion.article>
  );
}

export default function SprougJourney({ journey }) {
  return (
    <section id="journey" data-section className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
        <SectionLabel>Our Direction</SectionLabel>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-secondary md:text-6xl">
            What drives us <span className="text-primary">forward.</span>
          </h2>

          <p className="max-w-md text-base leading-7 text-text-secondary">
            Two ideas shape the work we do and the communities we build with.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {journey.map((item, index) => (
            <JourneyCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
