import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function SprougValues({ values }) {
  return (
    <section
      id="values"
      data-section
      className="border-y border-border-light bg-surface-muted"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>What We Stand For</SectionLabel>

            <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-secondary md:text-6xl">
              Our work is guided by{" "}
              <span className="text-primary">purpose.</span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-7 text-text-secondary md:text-right">
            Simple principles that keep our work focused on learners,
            communities, and meaningful outcomes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-border-light bg-surface p-7 transition-colors duration-300 hover:border-primary/40 md:p-8"
              >
                <span className="absolute right-6 top-5 font-display text-6xl font-extrabold leading-none text-primary/10 transition-colors duration-300 group-hover:text-primary/20">
                  0{index + 1}
                </span>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.tint} text-primary-dark`}
                >
                  <Icon size={21} />
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold text-secondary">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-text-secondary">
                  {item.description}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-primary transition-all duration-300 group-hover:w-20" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
