import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import LessonPreviewCard from "./LessonPreviewCard";
import { getFeaturedLessons } from "../../../api/lesson.api";

const EASE = [0.22, 1, 0.36, 1];

export default function LearningPreview() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadFeaturedLessons = async () => {
      try {
        setLoading(true);

        const response = await getFeaturedLessons();
        const list = response?.data?.lessons || response?.data || [];

        if (active) setLessons(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error(error);

        if (active) {
          toast.error(
            error?.response?.data?.message || "Failed to load featured lessons",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadFeaturedLessons();

    return () => {
      active = false;
    };
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 28,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: EASE,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-dark-bg px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      {/* Subtle dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,250,245,0.16)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />

      {/* Soft orange atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <motion.span
            variants={item}
            className="inline-block rounded-full border border-white/10 bg-dark-surface px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-light"
          >
            Explore &amp; Learn
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-5 font-display text-3xl font-bold leading-tight text-dark-text sm:text-4xl md:text-5xl"
          >
            Learn English Through{" "}
            <span className="text-primary">Real Conversations</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-xl font-sans text-sm leading-7 text-dark-muted md:text-base md:leading-8"
          >
            Explore simple lessons designed to help students understand,
            practice, and use English in everyday situations.
          </motion.p>
        </motion.div>

        {/* Lessons */}
        {loading ? (
          <div
            role="status"
            aria-label="Loading featured lessons"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-dark-surface"
              >
                <div className="h-40 bg-secondary" />

                <div className="space-y-3 p-6">
                  <div className="h-3 w-16 rounded-full bg-primary/20" />
                  <div className="h-5 w-3/4 rounded-full bg-white/10" />
                  <div className="h-3 w-full rounded-full bg-white/10" />
                  <div className="h-3 w-2/3 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : lessons.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-dark-surface px-6 py-12 text-center">
            <p className="font-sans text-sm text-dark-muted">
              Featured lessons will appear here soon.
            </p>
          </div>
        ) : (
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {lessons.map((lesson) => (
              <motion.li key={lesson._id} variants={item} className="h-full">
                <LessonPreviewCard
                  title={lesson.title}
                  grade={
                    lesson.topic?.grade
                      ? `Grade ${lesson.topic.grade}`
                      : "Grade 1-5"
                  }
                  description={lesson.description}
                  thumbnail={lesson.thumbnail?.url}
                  lessonId={lesson._id}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduce ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
          className="mt-12 text-center"
        >
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-dark-surface px-7 py-3 font-sans text-sm font-semibold text-primary-light shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[var(--shadow-md)]"
          >
            <span className="text-current">Explore All Lessons</span>

            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
