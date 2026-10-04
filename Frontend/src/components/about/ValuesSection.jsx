import { motion, useReducedMotion } from "framer-motion";

export default function ValuesSection({ values, bleed, pad }) {
  const reduce = useReducedMotion();

  if (!values?.length) return null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={`${bleed} ${pad} relative mt-32 overflow-hidden bg-surface-muted py-24`}
    >
      {/* Pattern layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#f1dfcf_1.2px,transparent_1.2px)] [background-size:22px_22px]" />
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary-light/70 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-lesson-peach/60 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Heading */}
        <motion.div variants={item}>
          <span className="mb-5 block h-1 w-12 rounded-full bg-primary" />
          <h3 className="font-display text-3xl font-bold leading-tight text-secondary md:text-4xl">
            What we believe
          </h3>
        </motion.div>

        {/* Editorial rows */}
        <ol className="mt-12 border-t border-border">
          {values.map((value, index) => (
            <motion.li
              key={value.title}
              variants={item}
              className="border-b border-border"
            >
              {/* Hover styles live on the inner div, not the animated li */}
              <div className="group relative grid gap-3 py-8 transition-colors duration-300 hover:bg-surface/70 md:grid-cols-[7rem_1fr_1.4fr] md:items-baseline md:gap-8 md:px-4 md:py-10 lg:grid-cols-[9rem_1fr_1.4fr]">
                {/* Accent bar that grows on hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 hidden h-0 w-1 rounded-r-full bg-primary transition-all duration-500 group-hover:h-full md:block"
                />

                {/* Numeral */}
                <span
                  aria-hidden="true"
                  className="font-display text-5xl font-extrabold leading-none text-primary/30 transition-colors duration-300 group-hover:text-primary md:text-6xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h4 className="font-display text-2xl font-bold text-secondary transition-colors duration-300 group-hover:text-primary-dark">
                  {value.title}
                </h4>

                {/* Text */}
                <p className="max-w-xl leading-7 text-text-secondary">
                  {value.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}
