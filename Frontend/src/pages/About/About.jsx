import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FaqItem from "../../components/about/FaqItem";
import PhraseCycler from "../../components/about/PhraseCycler";
import BenefitsSection from "../../components/about/BenefitsSection";
import LessonStepsSection from "../../components/about/LessonStepsSection";
import SentenceMarquee from "../../components/about/SentenceMarquee";
import AudienceSection from "../../components/about/AudienceSection";
import ValuesSection from "../../components/about/ValuesSection";
import ClosingCTA from "../../components/about/ClosingCTA";

import {
  BENEFITS,
  PHRASE_PAIRS,
  STEPS,
  AUDIENCES,
  SENTENCES,
  VALUES,
  FAQS,
  INTRO,
} from "../../components/about/AboutData";

gsap.registerPlugin(ScrollTrigger);

const BLEED = "-mx-6 md:-mx-12 lg:-mx-20";
const PAD = "px-6 md:px-12 lg:px-20";

export default function About() {
  const root = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);
  const mockRef = useRef(null);
  const stepsRef = useRef(null);
  const marqueeRef = useRef(null);

  const reduce = useReducedMotion();

  const { scrollY } = useScroll();

  const letterA = useTransform(scrollY, [0, 1500], reduce ? [0, 0] : [0, -260]);

  const letterB = useTransform(scrollY, [0, 1500], reduce ? [0, 0] : [0, 160]);

  const { scrollYProgress } = useScroll({
    target: mockRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  const cardY = useTransform(smooth, [0, 1], reduce ? [0, 0] : [70, -70]);

  const cardRotate = useTransform(
    smooth,
    [0, 1],
    reduce ? [0, 0] : [-2.5, 2.5],
  );

  const blobA = useTransform(smooth, [0, 1], reduce ? [0, 0] : [-40, 60]);

  const blobB = useTransform(smooth, [0, 1], reduce ? [0, 0] : [50, -50]);

  useEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-word",
        {
          color: "var(--border)",
        },
        {
          color: "var(--text-primary)",
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );

      gsap.from(".about-head", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-card", {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.to(".about-card", {
            yPercent: self.direction === 1 ? -2 : 2,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(".about-card", {
            yPercent: 0,
            duration: 0.6,
          });
        },
        onLeaveBack: () => {
          gsap.to(".about-card", {
            yPercent: 0,
            duration: 0.6,
          });
        },
      });

      gsap.fromTo(
        ".steps-line",
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray(".step-item").forEach((element) => {
        gsap.from(element, {
          opacity: 0.25,
          x: -30,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray(".marquee-row").forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            xPercent: index % 2 === 0 ? 8 : -20,
          },
          {
            xPercent: index % 2 === 0 ? -20 : 8,
            ease: "none",
            scrollTrigger: {
              trigger: marqueeRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      gsap.from(".rise-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".rise-wrap",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section
      ref={root}
      className="about-root relative w-full overflow-hidden bg-background px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="w-full">
        {/* Header */}
        <div className="relative flex min-h-[75vh] flex-col justify-center">
          <motion.span
            aria-hidden
            style={{ y: letterA }}
            className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[16rem] font-extrabold leading-none text-lesson-peach md:text-[28rem]"
          >
            अ
          </motion.span>

          <motion.span
            aria-hidden
            style={{ y: letterB }}
            className="pointer-events-none absolute bottom-0 right-[22%] select-none font-display text-[10rem] font-extrabold leading-none text-lesson-yellow md:text-[18rem]"
          >
            A
          </motion.span>

          <span className="about-head relative inline-block self-start rounded-full border border-border bg-primary-light px-4 py-1.5 text-sm font-semibold text-primary-dark">
            About Project Jhep
          </span>

          <h2 className="about-head relative mt-6 max-w-5xl font-display text-5xl font-extrabold leading-[1.02] text-secondary md:text-7xl lg:text-8xl">
            English that feels like home.
          </h2>

          <p
            ref={introRef}
            className="relative mt-10 max-w-5xl text-2xl font-medium leading-snug md:text-4xl"
          >
            {INTRO.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="about-word inline-block pr-[0.28em]"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Mockup + Description */}
        <div className="mt-24 grid items-center gap-16 lg:grid-cols-2">
          <div ref={mockRef} className="relative">
            <motion.div
              style={{ y: blobA }}
              className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-lesson-peach"
            />

            <motion.div
              style={{ y: blobB }}
              className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-lesson-yellow"
            />

            <motion.div
              style={{
                y: cardY,
                rotate: cardRotate,
              }}
              className="relative rounded-[2rem] border border-border bg-gradient-to-br from-accent-light to-surface p-8 shadow-[var(--shadow-lg)]"
            >
              <div className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-3xl bg-surface px-6 shadow-[var(--shadow-md)]">
                <span className="absolute left-5 top-5 rounded-full bg-lesson-orange px-3 py-1 text-xs font-semibold text-primary-dark">
                  Spoken English
                </span>

                <span className="absolute right-5 top-5 rounded-full bg-secondary-light px-3 py-1 text-xs font-semibold text-secondary">
                  Marathi support
                </span>

                <PhraseCycler phrases={PHRASE_PAIRS} />

                <p className="mt-4 text-sm font-medium text-text-muted">
                  Learn. Practice. Grow.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.4,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="font-display text-3xl font-bold leading-tight text-secondary md:text-4xl">
              Making English learning simple and accessible.
            </h3>

            <p className="mt-5 max-w-lg text-lg leading-8 text-text-secondary">
              Project Jhep is designed especially to support students who want
              to build confidence in English. The platform combines simple
              English content with Marathi support so that students can learn
              comfortably and understand concepts clearly.
            </p>
          </motion.div>
        </div>

        {/* Manifesto */}
        <div className="mt-32 overflow-hidden">
          {["Learn.", "Practice.", "Grow."].map((word, index) => (
            <motion.p
              key={word}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -120 : 120,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                amount: 0.6,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`font-display text-[18vw] font-extrabold leading-[0.9] md:text-[12vw] ${
                index === 1 ? "text-right text-primary" : "text-secondary"
              }`}
            >
              {word}
            </motion.p>
          ))}
        </div>

        {/* Benefits */}
        <BenefitsSection benefits={BENEFITS} gridRef={gridRef} />

        {/* Lesson Steps */}
        <LessonStepsSection
          steps={STEPS}
          stepsRef={stepsRef}
          bleed={BLEED}
          pad={PAD}
        />

        {/* Sentence Marquee */}
        <SentenceMarquee
          sentences={SENTENCES}
          marqueeRef={marqueeRef}
          bleed={BLEED}
        />

        {/* Audience */}
        <AudienceSection audiences={AUDIENCES} />

        {/* Values */}
        <ValuesSection values={VALUES} bleed={BLEED} pad={PAD} />

        {/* FAQ */}
        <div className="mx-auto mt-32 max-w-3xl">
          <h3 className="text-center font-display text-3xl font-bold text-secondary md:text-4xl">
            Common questions
          </h3>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <ClosingCTA bleed={BLEED} pad={PAD} />
      </div>
    </section>
  );
}
