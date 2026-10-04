import { useLayoutEffect, useRef } from "react";
import {
  BookOpen,
  MessageCircle,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const journeySteps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Start Learning",
    description: "Begin with simple English words and everyday vocabulary.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Learn Words",
    description:
      "Build your vocabulary with easy examples and Marathi support.",
  },
  {
    number: "03",
    icon: Target,
    title: "Build Sentences",
    description: "Learn how to combine words and create simple sentences.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Start Speaking",
    description: "Practice everyday conversations and express yourself.",
  },
  {
    number: "05",
    icon: Trophy,
    title: "Gain Confidence",
    description: "Use English confidently in school and everyday life.",
  },
];

export default function StudentJourney() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);

  /* End the mobile line at the center of the last icon */
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const update = () => {
      const last = el.querySelector("ol > li:last-child");
      if (!last) return;
      el.style.setProperty(
        "--line-bottom",
        `${Math.max(last.offsetHeight - 34, 0)}px`,
      );
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* The orange line fills as the list scrolls through the viewport */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      {/* Dot pattern, fading out at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#f1dfcf_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-20"
        >
          <motion.span
            variants={item}
            className="inline-block rounded-full border border-border bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark"
          >
            Student Journey
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-5 font-display text-3xl font-bold leading-tight text-secondary sm:text-4xl md:text-5xl"
          >
            From <span className="text-primary">Learning to Confidence</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary md:text-base md:leading-8"
          >
            Every student starts with simple words and gradually builds the
            skills and confidence to communicate in English.
          </motion.p>
        </motion.div>

        {/* Journey */}
        <div ref={listRef} className="relative">
          {/* Desktop line: track + progress */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[34px] hidden h-0.5 rounded-full bg-border md:block"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute left-[10%] right-[10%] top-[34px] hidden h-0.5 origin-left rounded-full bg-primary md:block"
          />

          {/* Mobile line: track + progress */}
          <div
            aria-hidden="true"
            className="absolute bottom-[var(--line-bottom,34px)] left-[34px] top-[34px] w-0.5 rounded-full bg-border md:hidden"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-[var(--line-bottom,34px)] left-[34px] top-[34px] w-0.5 origin-top rounded-full bg-primary md:hidden"
          />

          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="relative space-y-10 md:grid md:grid-cols-5 md:gap-6 md:space-y-0"
          >
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.li key={step.number} variants={item}>
                  {/* Hover styles live on the inner div, not the animated li */}
                  <div className="group flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
                    {/* Icon tile */}
                    <div className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-primary-dark shadow-[var(--shadow-sm)] ring-4 ring-background transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[var(--shadow-md)]">
                      <Icon size={26} strokeWidth={1.8} aria-hidden="true" />

                      <span
                        aria-hidden="true"
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark text-[11px] font-bold text-white ring-2 ring-background"
                      >
                        {index + 1}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="flex-1 md:mt-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-dark">
                        Step {step.number}
                      </span>

                      <h3 className="mt-1.5 font-display text-lg font-bold text-secondary md:text-xl">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-[280px] text-sm leading-6 text-text-secondary md:mx-auto md:max-w-[200px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
