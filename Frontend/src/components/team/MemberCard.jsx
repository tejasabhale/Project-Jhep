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

export default function MemberCard({ member }) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const lineRef = useRef(null);

  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  /*
   * Framer Motion handles the continuous scroll movement.
   *
   * Scroll down:
   * card moves from slightly below -> center -> slightly above
   *
   * Scroll up:
   * the exact animation reverses automatically.
   */
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    reduce ? [0, 0, 0, 0, 0] : [18, 6, 0, -6, -18],
  );

  const y = useSpring(rawY, {
    stiffness: 85,
    damping: 24,
    mass: 0.8,
  });

  /*
   * Very subtle scale movement.
   */
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    reduce ? [1, 1, 1, 1, 1] : [0.98, 0.995, 1, 0.995, 0.98],
  );

  const scale = useSpring(rawScale, {
    stiffness: 95,
    damping: 25,
    mass: 0.7,
  });

  useLayoutEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      /*
       * GSAP controls only the reveal.
       *
       * Enter from bottom:
       * fade + move up.
       *
       * Enter from top:
       * fade + move down.
       *
       * The card stays fully visible in the viewport.
       *
       * Scrolling in the opposite direction automatically
       * reverses the appropriate reveal.
       */
      const revealIn = (direction) => {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: direction === "up" ? -26 : 26,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.inOut",
            overwrite: true,
          },
        );
      };

      const revealOut = (direction) => {
        gsap.to(cardRef.current, {
          opacity: 0,
          y: direction === "up" ? 24 : -24,
          duration: 0.45,
          ease: "power2.inOut",
          overwrite: true,
        });
      };

      ScrollTrigger.create({
        trigger: wrapperRef.current,

        start: "top 90%",
        end: "bottom 10%",

        onEnter: () => {
          revealIn("down");
        },

        onEnterBack: () => {
          revealIn("up");
        },

        onLeave: () => {
          revealOut("down");
        },

        onLeaveBack: () => {
          revealOut("up");
        },
      });

      /*
       * Divider follows the same scroll direction.
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
            trigger: wrapperRef.current,
            start: "top 88%",
            end: "top 55%",
            scrub: 0.6,
          },
        },
      );

      ScrollTrigger.refresh();
    }, wrapperRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={wrapperRef} className="h-full">
      <motion.article
        ref={cardRef}
        style={{
          y,
          scale,
        }}
        className="member-card group relative flex h-full flex-col rounded-2xl border border-border-light bg-surface p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary-light hover:shadow-[var(--shadow-lg)]"
      >
        {/* Image */}
        <div className="flex justify-center">
          <MemberImage member={member} size="small" />
        </div>

        {/* Name */}
        <h3 className="mt-5 font-display text-lg font-semibold text-secondary transition-colors duration-200 group-hover:text-primary-dark">
          {member.name}
        </h3>

        {/* Role */}
        {member.role && (
          <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wide text-primary">
            {member.role}
          </p>
        )}

        {/* Description */}
        {member.description && (
          <p className="mt-3 flex-grow font-sans text-sm leading-6 text-text-secondary">
            {member.description}
          </p>
        )}

        {/* Divider */}
        <span
          ref={lineRef}
          className="mx-auto mt-5 block h-[2px] w-10 origin-center rounded-full bg-primary"
        />

        {/* Social Links */}
        <div className="mt-5 flex justify-center">
          <SocialLinks member={member} />
        </div>
      </motion.article>
    </div>
  );
}
