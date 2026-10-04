import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { SPROUG_HUB_URL } from "./SprougHubData";

export default function SprougCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="cta"
      data-section
      className="relative overflow-hidden bg-background"
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -18, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lesson-peach/70 blur-3xl"
      />

      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, 15, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-lesson-yellow/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex justify-center">
            <SectionLabel>Be Part of the Change</SectionLabel>
          </div>

          <h2 className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-tight text-secondary md:text-6xl">
            Better opportunities begin with{" "}
            <span className="text-primary">better access.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Sproug Hub Foundation brings together people, ideas, and technology
            to make learning more accessible and create meaningful
            opportunities.
          </p>

          <a
            href={SPROUG_HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold !text-white transition-colors duration-300 hover:bg-primary-dark hover:!text-white"
          >
            <span className="!text-white">Visit Sproug Hub Foundation</span>

            <ArrowUpRight
              size={17}
              className="text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
