import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { SPROUG_HUB_LOGO } from "./SprougHubData";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

export default function SprougHero({ onDiscover }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const patternRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, reduce ? 1 : 0.2],
  );

  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  useLayoutEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-line-inner", {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });

      gsap.to(patternRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden border-b border-border-light bg-surface"
    >
      {/* Background pattern */}
      <div
        ref={patternRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[30%] h-[130%] opacity-60 [background-image:radial-gradient(#f1dfcf_1.2px,transparent_1.2px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />

      {/* Hero content */}
      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-12 md:py-24 lg:px-8">
        {/* Text */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduce ? 0 : 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
        >
          <motion.div
            style={{
              y: textY,
              opacity: textOpacity,
            }}
            className="max-w-3xl"
          >
            <SectionLabel>About Sproug Hub</SectionLabel>

            <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-secondary sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="hero-line block overflow-hidden pb-[0.08em]">
                <span className="hero-line-inner block">
                  Growing <span className="text-primary">opportunities</span>
                </span>
              </span>

              <span className="hero-line block overflow-hidden pb-[0.08em]">
                <span className="hero-line-inner block">
                  through education.
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              Sproug Hub Foundation is a non-profit organization working to
              create equal opportunities through education, innovation, and
              technology.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              We believe every learner deserves access to quality education,
              regardless of their background, location, or available resources.
            </p>

            <button
              type="button"
              onClick={onDiscover}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-dark"
            >
              Discover our story
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </motion.div>

        {/* Logo card */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduce ? 0 : 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: EASE,
          }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center"
        >
          <motion.div style={{ y: cardY }} className="w-full">
            <div className="rounded-[2.25rem] border border-border bg-gradient-to-br from-accent-light to-surface p-7 shadow-[var(--shadow-lg)]">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.75rem] bg-surface p-10 shadow-[var(--shadow-md)]">
                <img
                  src={SPROUG_HUB_LOGO}
                  alt="Sproug Hub Foundation"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border-light pt-5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">
                  Education
                </span>

                <span className="text-xs font-medium text-text-muted">
                  Innovation • Community
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
