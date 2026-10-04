import { GraduationCap } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MemberImage from "./MemberImage";
import SocialLinks from "./SocialLinks";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

export default function FacultyCard({ faculty }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const lineRef = useRef(null);

  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Scroll movement: down while entering, up while leaving */
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [20, 0, -20] : [30, 0, -30],
  );

  const cardY = useSpring(rawY, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0.98, 1, 0.98] : [0.96, 1, 0.97],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    reduce ? [1, 1, 1, 1, 1] : [0.45, 0.8, 1, 0.8, 0.45],
  );

  useLayoutEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      /* Section heading line reveal + reverse */
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0.15,
          opacity: 0.4,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.65,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "top 55%",
            scrub: 0.7,
          },
        },
      );

      /* Small card lift based on scroll */
      gsap.fromTo(
        cardRef.current,
        {
          y: 24,
        },
        {
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={sectionRef} className="mb-16">
      {/* Section Heading */}
      <motion.div
        initial={{
          opacity: 0.35,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 0.65,
          ease: EASE,
        }}
        className="mb-7 text-center"
      >
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">
          Guiding Faculty
        </span>

        <h2 className="mt-2 font-display text-2xl font-semibold text-secondary md:text-3xl">
          Mentoring the Journey
        </h2>

        <span
          ref={lineRef}
          className="mx-auto mt-4 block h-[2px] w-12 origin-center rounded-full bg-[var(--gradient-primary)]"
        />
      </motion.div>

      {/* Faculty Card */}
      <motion.div
        style={{
          y: cardY,
          scale,
          opacity,
        }}
        initial={{
          opacity: 0.45,
          y: 30,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.15,
        }}
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
        className="mx-auto max-w-4xl"
      >
        <div
          ref={cardRef}
          className="faculty-card overflow-hidden rounded-[2rem] border border-border bg-surface transition-all duration-500 hover:border-primary-light hover:shadow-[var(--shadow-lg)]"
        >
          <div className="grid items-center md:grid-cols-[auto_1fr]">
            {/* Image */}
            <motion.div
              initial={{
                opacity: 0.5,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: EASE,
              }}
              className="flex justify-center px-8 py-10 md:px-12"
            >
              <MemberImage member={faculty} size="large" orbit />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{
                opacity: 0.5,
                x: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: 0.12,
                ease: EASE,
              }}
              className="px-8 pb-10 text-center md:px-10 md:py-10 md:text-left"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5">
                <GraduationCap size={15} className="text-primary-dark" />

                <span className="font-sans text-xs font-semibold text-primary-dark">
                  Guiding Faculty
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-secondary md:text-3xl">
                {faculty.name}
              </h3>

              {faculty.description && (
                <p className="mt-4 max-w-2xl font-sans text-sm leading-6 text-text-secondary">
                  {faculty.description}
                </p>
              )}

              <div className="mt-6 flex justify-center md:justify-start">
                <SocialLinks member={faculty} />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
