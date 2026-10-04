import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const patternRef = useRef(null);
  const lineRef = useRef(null);
  const accentRef = useRef(null);

  const reduce = useReducedMotion();

  /*
   * Uses the existing global Lenis scroll position.
   * No new Lenis instance is created here.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * Main content scroll movement.
   *
   * Scrolling down:
   *  +45px → 0 → -45px
   *
   * Scrolling back up:
   * automatically reverses.
   */
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    reduce ? [0, 0, 0, 0, 0] : [45, 14, 0, -14, -45],
  );

  const y = useSpring(rawY, {
    stiffness: 80,
    damping: 24,
    mass: 0.8,
  });

  /*
   * Keep the CTA visible.
   * Only a subtle fade is used near the edges.
   */
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    reduce ? [1, 1, 1, 1, 1] : [0.78, 0.95, 1, 0.95, 0.78],
  );

  const opacity = useSpring(rawOpacity, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  });

  /*
   * Small scale change.
   */
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    reduce ? [1, 1, 1, 1, 1] : [0.97, 0.99, 1, 0.99, 0.97],
  );

  const scale = useSpring(rawScale, {
    stiffness: 90,
    damping: 25,
    mass: 0.8,
  });

  useLayoutEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      /*
       * Background pattern follows the Lenis-driven scroll.
       */
      gsap.to(patternRef.current, {
        yPercent: 16,
        rotate: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Soft accent moves in the opposite direction.
       */
      gsap.to(accentRef.current, {
        x: -55,
        y: 70,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Divider animation.
       * Scrub makes it reversible when scrolling up.
       */
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0,
          opacity: 0.2,
        },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            end: "top 45%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        },
      );

      /*
       * Small content lift when the section first enters.
       * This does not fight Framer Motion because GSAP only
       * controls the inner reveal wrapper.
       */
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0.85,
        },
        {
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden border-t border-border-light bg-background"
    >
      {/* ================================================================
          BACKGROUND
      ================================================================ */}

      <div
        ref={patternRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[10%] opacity-45"
      >
        {/* Dot pattern */}
        <div className="absolute inset-0 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:24px_24px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--border-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-light)_1px,transparent_1px)] [background-size:80px_80px]" />

        {/* Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_85%)]" />
      </div>

      {/* Orange atmosphere */}
      <div
        ref={accentRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary-light/50 blur-[120px]"
      />

      {/* ================================================================
          MAIN CONTENT
      ================================================================ */}

      <motion.div
        style={{
          y,
          opacity,
          scale,
        }}
        className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:px-14 lg:px-8"
      >
        <div ref={contentRef} className="mx-auto max-w-5xl text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-1 w-12 rounded-full bg-primary" />

            <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark sm:text-sm">
              Every child deserves a chance to learn
            </span>

            <span className="h-1 w-12 rounded-full bg-primary" />
          </div>

          {/* Heading */}
          <h2 className="mt-7 font-display text-[3rem] font-semibold leading-[0.98] tracking-[-0.045em] text-secondary sm:text-5xl md:text-6xl lg:text-[5.25rem] xl:text-[5.7rem]">
            A little practice today,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "var(--gradient-primary)",
              }}
            >
              a more confident tomorrow.
            </span>
          </h2>

          {/* Animated line */}
          <div className="mx-auto mt-9 w-full max-w-xs overflow-hidden">
            <span
              ref={lineRef}
              className="block h-[3px] w-full origin-center rounded-full bg-primary"
            />
          </div>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-7 text-text-secondary sm:text-lg sm:leading-8 md:text-xl">
            Help children build the confidence to speak, understand, and use
            English in their everyday lives.
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-sans text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary-dark hover:shadow-[var(--shadow-lg)] active:scale-[0.98]"
          >
            <span className="text-white">Start Learning</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="text-white transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </button>

          {/* Supporting text */}
          <p className="mt-6 font-sans text-xs text-text-muted sm:text-sm">
            Learn at your own pace. Grow with confidence.
          </p>

          {/* Scroll statement */}
          <div className="mt-14 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-border" />

            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Learn · Practice · Grow
            </span>

            <span className="h-px w-10 bg-border" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
