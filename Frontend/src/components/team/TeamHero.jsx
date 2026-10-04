import { useLayoutEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

export default function TeamCTA() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const patternRef = useRef(null);

  const reduce = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [45, 0, -45],
  );

  const textY = useSpring(rawY, {
    stiffness: 85,
    damping: 24,
    mass: 0.8,
  });

  useLayoutEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(patternRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 0.8,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Reveal>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden border-t border-border-light bg-background"
      >
        {/* Subtle background text-like pattern */}
        <div
          ref={patternRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[10%] opacity-40"
        >
          <div className="absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,var(--primary-light),transparent_28%)] opacity-30" />
        </div>

        <motion.div
          style={{ y: textY }}
          className="relative mx-auto flex min-h-[70svh] w-full max-w-6xl items-center px-6 py-20 sm:px-10 md:py-24 lg:px-8"
        >
          <div className="w-full text-center">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 18,
              }}
              transition={{
                duration: 0.7,
                ease: EASE,
              }}
              className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-dark sm:text-sm"
            >
              One team, one mission
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 35,
              }}
              transition={{
                duration: 0.85,
                delay: 0.08,
                ease: EASE,
              }}
              className="mx-auto mt-6 max-w-5xl font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.045em] text-secondary sm:text-5xl md:text-6xl lg:text-[5rem]"
            >
              Every lesson.
              <br />
              Every detail.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "var(--gradient-primary)",
                }}
              >
                Shaped with care.
              </span>
            </motion.h2>

            {/* Rule */}
            <div className="mx-auto mt-8 w-full max-w-xs overflow-hidden">
              <span
                ref={lineRef}
                className="block h-[2px] w-full origin-left rounded-full bg-[var(--gradient-primary)]"
              />
            </div>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 25,
              }}
              transition={{
                duration: 0.75,
                delay: 0.18,
                ease: EASE,
              }}
              className="mx-auto mt-8 max-w-2xl font-sans text-base leading-7 text-text-secondary sm:text-lg sm:leading-8"
            >
              Many people. Many strengths. One shared purpose — making English
              learning simpler, more accessible, and more meaningful for every
              student.
            </motion.p>

            {/* Closing statement */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{
                duration: 0.7,
                delay: 0.28,
                ease: EASE,
              }}
              className="mx-auto mt-10 font-display text-lg font-semibold tracking-[-0.01em] text-secondary sm:text-xl"
            >
              Learn. Build. Empower.
            </motion.p>

            {/* Small supporting text */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: isInView ? 1 : 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.38,
              }}
              className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-text-muted"
            >
              The spirit behind Project Jhep
            </motion.p>
          </div>
        </motion.div>
      </section>
    </Reveal>
  );
}
