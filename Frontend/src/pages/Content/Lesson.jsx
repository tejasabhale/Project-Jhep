import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowLeft,
  ClipboardCheck,
  FileText,
  FileVideo,
  Maximize,
  Minimize,
  Presentation,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";

import { getLessonById, getLessonsByTopic } from "../../api/lesson.api";
import { getQuizByLesson } from "../../api/quiz.api";
import { getAllTopics } from "../../api/topic.api";
import { fileConfig } from "../../data/topicsData";
import { useFullscreen } from "../../hooks/useFullscreen";
import { getLessonFile, getQuizId, getQuizPath } from "../../lib/lesson";
import { EASE } from "../../lib/motion";

const LIBRARY_PATH = "/content";

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary-dark px-6 text-sm font-bold !text-white transition-colors duration-200 hover:bg-primary";

const outlineBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-bold text-secondary transition-colors duration-200 hover:border-primary hover:text-primary-dark";

export default function Lesson() {
  const { topicId, lessonId } = useParams();

  const pageRef = useRef(null);
  const viewerRef = useRef(null);
  const requestRef = useRef(0);

  const [isFullscreen, toggleFullscreen] = useFullscreen(viewerRef);

  const [topic, setTopic] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [frameLoaded, setFrameLoaded] = useState(false);

  /* ------------------------------ Data loading ----------------------------- */

  const loadTopic = useCallback(async () => {
    const requestId = ++requestRef.current;
    const isStale = () => requestId !== requestRef.current;

    try {
      setLoading(true);
      setError("");

      const [topicsResponse, lessonsResponse] = await Promise.all([
        getAllTopics(),
        getLessonsByTopic(topicId),
      ]);

      if (isStale()) return;

      const topicList = topicsResponse?.data?.topics ?? [];
      const lessonList = lessonsResponse?.data?.lessons ?? [];

      setTopic(topicList.find((item) => item._id === topicId) ?? null);

      setLessons(lessonList.filter((lesson) => lesson.isPublished === true));
    } catch (err) {
      if (isStale()) return;

      console.error("Failed to load lesson:", err);

      setError(err?.response?.data?.message || "Failed to load this lesson.");
    } finally {
      if (!isStale()) {
        setLoading(false);
      }
    }
  }, [topicId]);

  useEffect(() => {
    loadTopic();

    return () => {
      requestRef.current += 1;
    };
  }, [loadTopic]);

  const index = lessons.findIndex((lesson) => lesson._id === lessonId);

  /* ---------------------------- Direct fallback --------------------------- */

  const [fallback, setFallback] = useState({
    id: null,
    lesson: null,
  });

  const needsFallback =
    !loading && !error && index < 0 && fallback.id !== lessonId;

  useEffect(() => {
    if (!needsFallback) {
      return undefined;
    }

    let cancelled = false;

    getLessonById(lessonId)
      .then((res) => {
        if (cancelled) return;

        const found = res?.data?.lesson ?? res?.data ?? null;

        const usable = found?._id && found.isPublished !== false ? found : null;

        setFallback({
          id: lessonId,
          lesson: usable,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFallback({
            id: lessonId,
            lesson: null,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [needsFallback, lessonId]);

  const current =
    index >= 0
      ? lessons[index]
      : fallback.id === lessonId
        ? (fallback.lesson ?? undefined)
        : undefined;

  /* ---------------------------------- Quiz --------------------------------- */

  const lessonQuizId = getQuizId(current);

  const [lookup, setLookup] = useState({
    lessonId: null,
    quizId: null,
  });

  useEffect(() => {
    if (!current?._id || lessonQuizId || current.hasQuiz === false) {
      return undefined;
    }

    let cancelled = false;

    getQuizByLesson(current._id)
      .then((res) => {
        if (cancelled) return;

        const quiz = res?.data?.quiz ?? res?.data ?? null;

        setLookup({
          lessonId: current._id,
          quizId: quiz?._id ?? null,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setLookup({
            lessonId: current._id,
            quizId: null,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [current?._id, current?.hasQuiz, lessonQuizId]);

  const quizId =
    lessonQuizId ?? (lookup.lessonId === current?._id ? lookup.quizId : null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    setFrameLoaded(false);
  }, [lessonId]);

  useEffect(() => {
    if (!current?.title) {
      return undefined;
    }

    const previousTitle = document.title;

    document.title = current.title;

    return () => {
      document.title = previousTitle;
    };
  }, [current?.title]);

  /* ----------------------------- GSAP entrance ---------------------------- */

  const currentId = current?._id;

  useLayoutEffect(() => {
    if (!currentId || !pageRef.current) {
      return undefined;
    }

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        tl.from("[data-viewer]", {
          opacity: 0,
          y: 20,
          duration: 0.65,
          clearProps: "opacity,transform",
        }).from(
          "[data-reveal]",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
            stagger: 0.06,
            clearProps: "opacity,transform",
          },
          "-=0.3",
        );
      },
      pageRef,
    );

    return () => mm.revert();
  }, [currentId]);

  /* -------------------------------- Loading -------------------------------- */

  if (loading || needsFallback) {
    return (
      <main className="min-h-[100svh] w-full bg-background">
        <div
          role="status"
          aria-label="Loading lesson"
          className="w-full px-4 py-6 sm:px-6 lg:px-8"
        >
          <div className="h-5 w-32 rounded-full bg-surface-muted motion-safe:animate-pulse" />

          <div className="mt-6 space-y-5">
            <div className="aspect-video w-full rounded-2xl bg-surface-muted motion-safe:animate-pulse" />

            <div className="h-8 w-2/3 rounded-full bg-surface-muted motion-safe:animate-pulse" />

            <div className="h-4 w-1/2 rounded-full bg-surface-muted motion-safe:animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  /* ---------------------------------- Error -------------------------------- */

  if (error || !current) {
    return (
      <MotionConfig reducedMotion="user">
        <main className="flex min-h-[100svh] items-center justify-center bg-background px-4">
          <motion.div
            role={error ? "alert" : undefined}
            initial={{
              opacity: 0,
              y: 16,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              ease: EASE,
            }}
            className="w-full max-w-md rounded-3xl border border-border-light bg-surface p-10 text-center shadow-[var(--shadow-md)]"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error-light text-error">
              <TriangleAlert className="h-7 w-7" aria-hidden="true" />
            </span>

            <h1 className="mt-4 font-display text-xl font-bold text-secondary">
              {error ? "We couldn't load this lesson" : "Lesson not found"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {error || "This lesson is no longer available."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {error && (
                <button
                  type="button"
                  onClick={loadTopic}
                  className={primaryBtn}
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Try again
                </button>
              )}

              <Link
                to={LIBRARY_PATH}
                className={error ? outlineBtn : primaryBtn}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to library
              </Link>
            </div>
          </motion.div>
        </main>
      </MotionConfig>
    );
  }

  /* ---------------------------------- Lesson -------------------------------- */

  const file = getLessonFile(current);
  const fileType = file.type;

  const isVideo = fileType === "video";
  const isPptx = fileType === "pptx";

  const url = file.url;
  const hasQuiz = Boolean(quizId);

  const FileIcon = isVideo ? FileVideo : isPptx ? Presentation : FileText;

  return (
    <MotionConfig reducedMotion="user">
      <main ref={pageRef} className="min-h-[100svh] w-full bg-background">
        <div className="w-full px-4 py-5 sm:px-6 lg:px-8">
          {/* Top bar */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-3"
            data-reveal
          >
            <Link
              to={LIBRARY_PATH}
              className="group inline-flex items-center gap-2 rounded-lg py-1 text-sm font-semibold text-text-secondary transition-colors duration-200 hover:text-primary-dark"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
              />
              Back to library
            </Link>

            {topic?.title && (
              <>
                <span className="text-text-muted" aria-hidden="true">
                  /
                </span>

                <span className="truncate text-sm font-semibold text-text-muted">
                  {topic.title}
                </span>
              </>
            )}
          </nav>

          {/* Full-width viewer */}
          <div
            data-viewer
            ref={viewerRef}
            className={`mt-4 overflow-hidden bg-dark-bg ${
              isFullscreen
                ? "fixed inset-0 z-50 flex h-full w-full flex-col rounded-none"
                : "w-full rounded-2xl border border-border-light shadow-[var(--shadow-md)]"
            }`}
          >
            <div
              className={
                isFullscreen
                  ? "min-h-0 flex-1"
                  : "h-[calc(100svh-180px)] min-h-[520px] w-full"
              }
            >
              {url ? (
                <>
                  <iframe
                    key={current._id}
                    src={url}
                    title={file.name || current.title}
                    onLoad={() => setFrameLoaded(true)}
                    className="h-full w-full border-0"
                    allow={
                      isVideo
                        ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        : undefined
                    }
                    scrolling={isPptx ? "no" : undefined}
                    allowFullScreen
                  />

                  <AnimatePresence>
                    {!frameLoaded && (
                      <motion.div
                        key="frame-loading"
                        initial={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-dark-bg"
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-dark-surface text-dark-muted motion-safe:animate-pulse">
                          <FileIcon className="h-8 w-8" />
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-dark-surface text-dark-muted">
                    <FileIcon className="h-8 w-8" aria-hidden="true" />
                  </span>

                  <p className="text-base font-semibold text-dark-text">
                    This lesson isn&apos;t ready yet
                  </p>

                  <p className="text-sm text-dark-muted">
                    The file link is missing.
                  </p>
                </div>
              )}
            </div>

            {/* Viewer toolbar */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-dark-surface px-4 py-2">
              <p className="flex min-w-0 items-center gap-2 text-xs text-dark-muted">
                <FileIcon className="h-4 w-4 shrink-0" aria-hidden="true" />

                <span className="truncate">{file.name || current.title}</span>
              </p>

              <motion.button
                type="button"
                onClick={toggleFullscreen}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-dark-muted transition-colors duration-200 hover:bg-white/10 hover:text-dark-text"
                aria-label={isFullscreen ? "Exit fullscreen" : "Go fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Go fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize className="h-[18px] w-[18px]" aria-hidden="true" />
                ) : (
                  <Maximize className="h-[18px] w-[18px]" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Lesson information */}
          <section className="mt-6">
            <div
              data-reveal
              className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary-dark"
            >
              <span>{fileConfig[fileType]?.label ?? "Learning Material"}</span>

              {file.duration && (
                <>
                  <span className="text-text-muted" aria-hidden="true">
                    ·
                  </span>

                  <span className="text-text-muted">{file.duration}</span>
                </>
              )}
            </div>

            <h1
              data-reveal
              className="mt-2 font-display text-2xl font-bold tracking-tight text-secondary sm:text-3xl"
            >
              {current.title}
            </h1>

            {current.description && (
              <p
                data-reveal
                className="mt-3 max-w-4xl text-base leading-7 text-text-secondary"
              >
                {current.description}
              </p>
            )}
          </section>

          {/* Quiz */}
          {hasQuiz && (
            <section
              data-reveal
              className="mt-6 flex flex-col gap-4 rounded-2xl border border-border-light bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lesson-orange text-primary-dark">
                  <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                </span>

                <div>
                  <p className="font-display text-base font-bold text-secondary">
                    Test your understanding
                  </p>

                  <p className="mt-0.5 text-sm text-text-secondary">
                    Take the quiz for this lesson.
                  </p>
                </div>
              </div>

              <motion.div whileTap={{ scale: 0.97 }}>
                <Link to={getQuizPath(quizId)} className={primaryBtn}>
                  <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                  Take Quiz
                </Link>
              </motion.div>
            </section>
          )}

          {/* Back */}
          <div data-reveal className="mt-6 border-t border-border-light pt-6">
            <Link to={LIBRARY_PATH} className={outlineBtn}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to lesson library
            </Link>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}
