import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

function AudienceCard({ Icon, title, text, tint, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Same scroll animation for every card
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduce ? [0, 0, 0, 0] : [50, 0, 0, -50],
  );

  const y = useSpring(rawY, {
    stiffness: 90,
    damping: 24,
    mass: 0.7,
  });

  return (
    <motion.li
      ref={ref}
      style={{ y }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rise-card"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-surface p-7 shadow-[var(--shadow-sm)] transition-colors duration-300 hover:border-primary/40 md:p-8">
        {/* Top accent */}
        <div
          aria-hidden="true"
          className={`absolute left-0 top-0 h-1 w-14 ${tint}`}
        />

        {/* Number */}
        <span
          aria-hidden="true"
          className="absolute right-6 top-5 font-display text-5xl font-extrabold leading-none text-primary/15 transition-colors duration-300 group-hover:text-primary/25"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon */}
        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-xl text-primary-dark ring-1 ring-primary/10 ${tint}`}
        >
          <Icon size={22} aria-hidden="true" />
        </div>

        {/* Content */}
        <h4 className="relative mt-6 font-display text-xl font-bold text-secondary transition-colors duration-300 group-hover:text-primary-dark">
          {title}
        </h4>

        <p className="relative mt-2 leading-7 text-text-secondary">{text}</p>

        {/* Bottom border */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-border-light"
        />
      </div>
    </motion.li>
  );
}

export default function AudienceSection({ audiences }) {
  if (!audiences?.length) return null;

  return (
    <section className="rise-wrap mt-32">
      {/* Heading */}
      <span className="mb-5 block h-1 w-12 rounded-full bg-primary" />

      <h3 className="max-w-2xl font-display text-3xl font-bold leading-tight text-secondary md:text-4xl">
        Built for everyone who helps a student learn.
      </h3>

      {/* Cards */}
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {audiences.map(({ icon: Icon, title, text, tint }, index) => (
          <AudienceCard
            key={title}
            Icon={Icon}
            title={title}
            text={text}
            tint={tint}
            index={index}
          />
        ))}
      </ul>
    </section>
  );
}
