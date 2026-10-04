import { HeartHandshake, Quote } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function SprougStory() {
  return (
    <section id="story" data-section className="bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lesson-orange text-primary-dark">
              <HeartHandshake size={27} />
            </div>

            <SectionLabel>Our Story</SectionLabel>

            <h2 className="max-w-xl font-display text-4xl font-extrabold leading-[1.03] text-secondary md:text-6xl">
              Education can <span className="text-primary">change lives.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <Quote
              size={70}
              strokeWidth={1.5}
              className="absolute -left-4 -top-8 text-primary/10"
            />

            <p className="relative max-w-3xl font-display text-2xl font-semibold leading-relaxed text-secondary md:text-4xl">
              Sproug Hub Foundation is built around one simple belief: education
              should create possibilities.
            </p>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary">
              We work to support learners and communities by combining
              education, technology, creativity, and collaboration. Our
              initiatives focus on creating practical learning experiences that
              are easy to understand, accessible to use, and useful in everyday
              life.
            </p>

            <p className="mt-5 max-w-2xl leading-7 text-text-secondary">
              Through our work, we aim to help learners develop knowledge,
              confidence, communication skills, and the ability to pursue better
              opportunities.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {["Learn", "Build", "Empower"].map((word, index) => (
                <div
                  key={word}
                  className="rounded-2xl border border-border bg-surface px-5 py-5 transition-colors duration-300 hover:border-primary/40"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    0{index + 1}
                  </span>

                  <p className="mt-2 font-display text-xl font-bold text-secondary">
                    {word}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
