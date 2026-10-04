import { motion } from "framer-motion";

export default function ClosingCTA({ bleed, pad }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.4,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${bleed} ${pad} relative -mb-28 mt-32 overflow-hidden bg-surface-muted py-28 text-center md:py-32`}
    >
      {/* Decorative Marathi character */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-8 -top-16 select-none font-display text-[16rem] font-extrabold leading-none text-lesson-peach md:text-[20rem]"
      >
        अ
      </span>

      {/* Decorative English character */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-6 select-none font-display text-[16rem] font-extrabold leading-none text-lesson-yellow md:text-[20rem]"
      >
        A
      </span>

      <div className="relative z-10">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-sm font-semibold text-primary-dark">
          Start Learning
        </span>

        <h3 className="relative mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight text-secondary md:text-6xl">
          Ready to start speaking English?
        </h3>

        <p className="relative mx-auto mt-5 max-w-xl text-lg leading-8 text-text-secondary">
          Pick a lesson, learn a few phrases, and say them out loud today.
        </p>

        <a
          href="/login"
          className="relative mt-10 inline-flex items-center rounded-full bg-primary px-8 py-3.5 font-semibold text-text-on-primary transition-colors hover:bg-primary-dark"
        >
          Start learning
        </a>
      </div>
    </motion.div>
  );
}
