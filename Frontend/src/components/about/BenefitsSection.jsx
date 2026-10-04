import { motion, useReducedMotion } from "framer-motion";

export default function BenefitsSection({ benefits, gridRef }) {
  const reduce = useReducedMotion();

  return (
    <div
      ref={gridRef}
      className="mt-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {benefits.map(({ icon: Icon, title, description, tint }) => (
        <motion.article
          key={title}
          whileHover={
            reduce
              ? undefined
              : {
                  y: -6,
                }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className={`about-card flex h-full flex-col rounded-3xl border border-border-light p-8 shadow-[var(--shadow-sm)] hover:border-primary hover:shadow-[var(--shadow-md)] ${tint}`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-primary-dark shadow-[var(--shadow-sm)]">
            <Icon size={22} strokeWidth={2} />
          </div>

          <h4 className="mt-6 font-display text-2xl font-bold text-secondary">
            {title}
          </h4>

          <p className="mt-3 leading-7 text-text-secondary">{description}</p>
        </motion.article>
      ))}
    </div>
  );
}
