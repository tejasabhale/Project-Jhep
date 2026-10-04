import { motion } from "framer-motion";

export default function SprougImpact() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
            Why It Matters
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.04] text-white md:text-6xl">
            Access should not decide{" "}
            <span className="text-primary">who gets to grow.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-dark-muted md:text-lg">
            When learning becomes more accessible, people gain the confidence
            and skills to participate, create, and shape better futures.
          </p>
        </motion.div>
      </div>

      <div className="border-t border-white/10 overflow-hidden py-4">
        <motion.div
          className="flex w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="flex shrink-0 items-center gap-7 px-5 font-display text-lg font-semibold text-white/20"
            >
              Learn
              <span className="text-primary">•</span>
              Empower
              <span className="text-primary">•</span>
              Grow
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
