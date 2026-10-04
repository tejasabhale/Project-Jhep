import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import {
  BookOpen,
  ClipboardCheck,
  PanelLeft,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Search,
  SearchX,
  TriangleAlert,
  X,
} from "lucide-react";

import { getLessonsByTopic } from "../../api/lesson.api";
import { getAllTopics } from "../../api/topic.api";
import { fileConfig } from "../../data/topicsData";
import { getLessonFile, getQuizId } from "../../lib/lesson";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { EASE } from "../../lib/motion";

import { AnimatedNumber } from "../../components/ui/AnimatedNumber";
import { FilterChip } from "../../components/content/FilterChip";
import { ModuleRow } from "../../components/content/ModuleRow";
import { RowSkeleton } from "../../components/content/RowSkeleton";
import { MobileTopicDrawer } from "../../components/content/MobileTopicDrawer";
import { TopicSidebar } from "../../components/content/TopicSidebar";

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary-dark px-6 text-sm font-bold !text-white transition-colors duration-200 hover:bg-primary focus-visible:outline-offset-4";

const outlineBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-bold text-secondary transition-colors duration-200 hover:border-primary hover:text-primary-dark focus-visible:outline-offset-4";

const plural = (n, one, many) => (n === 1 ? one : many);

/* -------------------------------------------------------------------------- */
/*  Topic rail: thin line with one tick per topic, between sidebar & content   */
/* -------------------------------------------------------------------------- */

const RAIL_START = 72; // space reserved for the sticky toggle at the top

function TopicRail({ open, onToggle, topics }) {
  const railRef = useRef(null);
  const marksRef = useRef([]);

  const [marks, setMarks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const Icon = open ? PanelLeftClose : PanelLeftOpen;

  // Measure where each topic section starts, relative to the rail.
  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const railTop = rail.getBoundingClientRect().top;
    const next = [];

    topics.forEach((topic) => {
      const el = document.querySelector(`[data-topic-id="${topic._id}"]`);
      if (!el) return;

      next.push({
        id: topic._id,
        title: topic.title,
        top: Math.max(el.getBoundingClientRect().top - railTop, RAIL_START),
      });
    });

    marksRef.current = next;
    setMarks(next);
  }, [topics]);

  useLayoutEffect(() => {
    measure();

    // Re-measure after the topic cross-fade has swapped the content in.
    const timer = window.setTimeout(measure, 300);

    const rail = railRef.current;
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;

    if (rail && observer) observer.observe(rail);

    window.addEventListener("resize", measure);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Scroll-spy: the active topic is the last one that has passed 35% of the viewport.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const threshold = window.innerHeight * 0.35;
      let index = 0;

      marksRef.current.forEach((mark, i) => {
        const el = document.querySelector(`[data-topic-id="${mark.id}"]`);
        if (el && el.getBoundingClientRect().top <= threshold) index = i;
      });

      setActiveIndex(index);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [marks]);

  const showTicks = marks.length > 1;
  const safeActive = Math.min(activeIndex, Math.max(marks.length - 1, 0));
  const fillTo = showTicks ? marks[safeActive].top : RAIL_START;

  const goTo = (id) => {
    document
      .querySelector(`[data-topic-id="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={railRef}
      className="relative mx-3 hidden w-10 shrink-0 self-stretch lg:block"
    >
      {/* neutral track */}
      <div
        aria-hidden="true"
        style={{ top: RAIL_START }}
        className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-border"
      />

      {/* progress fill up to the active topic */}
      {showTicks && (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ height: Math.max(fillTo - RAIL_START, 0) }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ top: RAIL_START }}
          className="absolute left-1/2 w-0.5 -translate-x-1/2 bg-primary"
        />
      )}

      {/* one tick per topic */}
      {showTicks && (
        <ul className="m-0 list-none p-0">
          {marks.map((mark, i) => {
            const passed = i <= safeActive;
            const current = i === safeActive;

            return (
              <li
                key={mark.id}
                style={{ top: mark.top }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  onClick={() => goTo(mark.id)}
                  title={mark.title}
                  aria-label={`Jump to ${mark.title}`}
                  aria-current={current ? "true" : undefined}
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                >
                  <span
                    className={`block rounded-full border-2 transition-all duration-300 ${
                      current
                        ? "h-3.5 w-3.5 border-primary bg-surface"
                        : passed
                          ? "h-2.5 w-2.5 border-primary bg-primary"
                          : "h-2.5 w-2.5 border-border bg-surface"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* sticky toggle */}
      <div className="sticky top-6 z-10 flex justify-center rounded-full bg-background py-2">
        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? "Hide topics sidebar" : "Show topics sidebar"}
          title={open ? "Hide topics" : "Show topics"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-[var(--shadow-sm)] transition-colors duration-200 hover:border-primary hover:bg-primary-light hover:text-primary-dark"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function Content() {
  const pageRef = useRef(null);
  const requestRef = useRef(0);

  const [topics, setTopics] = useState([]);
  const [failedTopics, setFailedTopics] = useState([]);
  const [selectedId, setSelectedId] = useState("all");

  const [query, setQuery] = useState("");
  const [fileType, setFileType] = useState("all");
  const [onlyQuiz, setOnlyQuiz] = useState(false);

  // Open by default. The sidebar is desktop-only (lg and up); smaller
  // screens use the topic drawer instead, so this has no effect there.
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------ Data loading ----------------------------- */

  const loadContent = useCallback(async () => {
    const requestId = ++requestRef.current;
    const isStale = () => requestId !== requestRef.current;

    try {
      setLoading(true);
      setError("");

      const response = await getAllTopics();

      if (isStale()) return;

      const published = (response?.data?.topics ?? []).filter(
        (topic) => topic.isPublished === true,
      );

      const results = await Promise.all(
        published.map(async (topic) => {
          try {
            const lessonResponse = await getLessonsByTopic(topic._id);

            const lessons = (lessonResponse?.data?.lessons ?? []).filter(
              (lesson) => lesson.isPublished === true,
            );

            return {
              topic: {
                ...topic,
                lessons,
              },
              failed: false,
            };
          } catch (lessonError) {
            console.error(
              `Failed to load lessons for ${topic.title}`,
              lessonError,
            );

            return {
              topic: {
                ...topic,
                lessons: [],
              },
              failed: true,
            };
          }
        }),
      );

      if (isStale()) return;

      setTopics(results.map((result) => result.topic));

      setFailedTopics(
        results
          .filter((result) => result.failed)
          .map((result) => result.topic.title),
      );

      setSelectedId("all");
    } catch (err) {
      if (isStale()) return;

      console.error("Failed to load content:", err);

      setError(err?.response?.data?.message || "Failed to load content.");
    } finally {
      if (!isStale()) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadContent();

    return () => {
      requestRef.current += 1;
    };
  }, [loadContent]);

  useEffect(() => {
    document.title = "Lesson Library";
  }, []);

  /* ------------------------- GSAP: one intro sequence ---------------------- */

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from("[data-intro]", {
          opacity: 0,
          y: 18,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          clearProps: "opacity,transform",
        });
      },
      pageRef,
    );

    return () => mm.revert();
  }, []);

  /* -------------------------------- Filtering ------------------------------ */

  const debouncedQuery = useDebouncedValue(query, 180);
  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const hasFilters = Boolean(normalizedQuery) || fileType !== "all" || onlyQuiz;

  const canClear = Boolean(query) || fileType !== "all" || onlyQuiz;

  const availableTypes = useMemo(() => {
    const types = new Set();

    topics.forEach((topic) => {
      (topic.lessons ?? []).forEach((lesson) => {
        const { type } = getLessonFile(lesson);

        if (type) {
          types.add(type);
        }
      });
    });

    return [...types];
  }, [topics]);

  const filteredTopics = useMemo(() => {
    return topics
      .map((topic) => {
        const topicMatches =
          !normalizedQuery ||
          topic.title?.toLowerCase().includes(normalizedQuery) ||
          topic.description?.toLowerCase().includes(normalizedQuery);

        const lessons = (topic.lessons ?? []).filter((lesson) => {
          const lessonFile = getLessonFile(lesson);

          const textMatches =
            topicMatches ||
            lesson.title?.toLowerCase().includes(normalizedQuery) ||
            lesson.description?.toLowerCase().includes(normalizedQuery) ||
            lessonFile.name?.toLowerCase().includes(normalizedQuery);

          const typeMatches =
            fileType === "all" || lessonFile.type === fileType;

          const quizMatches = !onlyQuiz || Boolean(getQuizId(lesson));

          return textMatches && typeMatches && quizMatches;
        });

        return {
          ...topic,
          lessons,
        };
      })
      .filter((topic) => !hasFilters || topic.lessons.length > 0);
  }, [topics, normalizedQuery, fileType, onlyQuiz, hasFilters]);

  const totalModules = useMemo(
    () => topics.reduce((sum, topic) => sum + (topic.lessons?.length ?? 0), 0),
    [topics],
  );

  const shownModules = useMemo(
    () => filteredTopics.reduce((sum, topic) => sum + topic.lessons.length, 0),
    [filteredTopics],
  );

  const selectedExists = filteredTopics.some(
    (topic) => topic._id === selectedId,
  );

  const activeId = selectedId === "all" || selectedExists ? selectedId : "all";

  const visibleTopics =
    activeId === "all"
      ? filteredTopics
      : filteredTopics.filter((topic) => topic._id === activeId);

  const selectedTopic = topics.find((topic) => topic._id === activeId);

  const clearFilters = () => {
    setQuery("");
    setFileType("all");
    setOnlyQuiz(false);
    setSelectedId("all");
  };

  /* --------------------------------- Render -------------------------------- */

  return (
    <MotionConfig reducedMotion="user">
      {/* overflow-x-clip (not hidden) so position: sticky keeps working */}
      <main
        ref={pageRef}
        className="min-h-[100svh] w-full overflow-x-clip bg-background"
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Header */}
          <header className="mb-8 overflow-hidden rounded-3xl border border-border-light bg-[image:var(--gradient-soft)] px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <span
                  data-intro
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-dark"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  Learning
                </span>

                <h1
                  data-intro
                  className="mt-3 font-display text-3xl font-bold tracking-tight text-secondary sm:text-4xl"
                >
                  Lesson Library
                </h1>

                <p
                  data-intro
                  className="mt-2 text-base leading-7 text-text-secondary"
                >
                  Explore lessons by topic and choose the learning material you
                  need.
                </p>
              </div>

              {!loading && !error && (
                <p
                  className="shrink-0 text-sm font-semibold text-text-secondary"
                  aria-label={`${topics.length} ${plural(
                    topics.length,
                    "topic",
                    "topics",
                  )}, ${totalModules} ${plural(
                    totalModules,
                    "module",
                    "modules",
                  )}`}
                >
                  <AnimatedNumber value={topics.length} />{" "}
                  {plural(topics.length, "topic", "topics")}
                  <span className="mx-2 text-text-muted" aria-hidden="true">
                    ·
                  </span>
                  <AnimatedNumber value={totalModules} />{" "}
                  {plural(totalModules, "module", "modules")}
                </p>
              )}
            </div>
          </header>

          {/* Search + filters */}
          <div
            data-intro
            className="mb-8 flex flex-col gap-3 xl:flex-row xl:items-center"
          >
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics or lessons"
                aria-label="Search lessons"
                className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-11 text-sm text-text-primary outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] [&::-webkit-search-cancel-button]:hidden"
              />

              <AnimatePresence>
                {query && (
                  <motion.button
                    key="clear"
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-secondary"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center gap-2"
              >
                <FilterChip
                  active={onlyQuiz}
                  onClick={() => setOnlyQuiz((prev) => !prev)}
                  icon={ClipboardCheck}
                >
                  Has quiz
                </FilterChip>

                {availableTypes.length > 1 && (
                  <>
                    <FilterChip
                      active={fileType === "all"}
                      onClick={() => setFileType("all")}
                    >
                      All types
                    </FilterChip>

                    {availableTypes.map((type) => (
                      <FilterChip
                        key={type}
                        active={fileType === type}
                        onClick={() => setFileType(type)}
                      >
                        {fileConfig[type]?.label ?? type}
                      </FilterChip>
                    ))}
                  </>
                )}

                <AnimatePresence>
                  {canClear && (
                    <motion.button
                      key="clear-filters"
                      type="button"
                      onClick={clearFilters}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18 }}
                      className="px-1 text-xs font-bold text-primary-dark hover:underline"
                    >
                      Clear filters
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div
              role="status"
              aria-label="Loading lessons"
              className="divide-y divide-border-light overflow-hidden rounded-2xl border border-border-light bg-surface"
            >
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex flex-col items-center rounded-3xl border border-error/30 bg-error-light px-6 py-14 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-error">
                <TriangleAlert className="h-7 w-7" aria-hidden="true" />
              </span>

              <h2 className="mt-4 font-display text-lg font-bold text-secondary">
                We couldn&apos;t load the lessons
              </h2>

              <p className="mt-1 max-w-sm text-sm text-text-secondary">
                {error}
              </p>

              <button
                type="button"
                onClick={loadContent}
                className={`mt-5 ${primaryBtn}`}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try again
              </button>
            </motion.div>
          )}

          {/* Main content */}
          {!loading && !error && (
            <>
              {/* Partial failure */}
              {failedTopics.length > 0 && (
                <div
                  role="status"
                  className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-error/30 bg-error-light px-4 py-3 text-sm text-text-secondary"
                >
                  <span>
                    Some lessons didn&apos;t load for{" "}
                    <strong className="text-secondary">
                      {failedTopics.join(", ")}
                    </strong>
                    .
                  </span>

                  <button
                    type="button"
                    onClick={loadContent}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-dark hover:underline"
                  >
                    <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                    Retry
                  </button>
                </div>
              )}

              {/* Mobile topic navigation */}
              {filteredTopics.length > 0 && (
                <div className="mb-6 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(true)}
                    aria-haspopup="dialog"
                    className="flex w-full items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-left transition-colors duration-200 hover:border-primary"
                  >
                    <PanelLeft
                      className="h-4 w-4 shrink-0 text-text-muted"
                      aria-hidden="true"
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                        Topic
                      </span>

                      <span className="block truncate text-sm font-semibold text-secondary">
                        {activeId === "all"
                          ? "All topics"
                          : (selectedTopic?.title ?? "All topics")}
                      </span>
                    </span>

                    <span className="shrink-0 text-xs font-bold text-primary-dark">
                      {activeId === "all"
                        ? shownModules
                        : (visibleTopics[0]?.lessons.length ?? 0)}
                    </span>
                  </button>
                </div>
              )}

              <MobileTopicDrawer
                open={mobileNavOpen}
                onClose={closeMobileNav}
                topics={filteredTopics}
                selectedId={activeId}
                onSelect={setSelectedId}
                totalModules={shownModules}
              />

              {/* Sidebar | rail | content */}
              <div className="flex w-full items-start">
                {/* TopicSidebar animates its own width and stays sticky */}
                <AnimatePresence initial={false}>
                  {sidebarOpen && (
                    <TopicSidebar
                      key="sidebar"
                      topics={filteredTopics}
                      selectedId={activeId}
                      onSelect={setSelectedId}
                      totalModules={shownModules}
                      onClose={() => setSidebarOpen(false)}
                    />
                  )}
                </AnimatePresence>

                <TopicRail
                  open={sidebarOpen}
                  onToggle={() => setSidebarOpen((v) => !v)}
                  topics={visibleTopics}
                />

                {/* Main content */}
                <section className="min-w-0 flex-1">
                  {hasFilters && (
                    <p
                      aria-live="polite"
                      className="mb-4 text-sm text-text-secondary"
                    >
                      Showing{" "}
                      <span className="font-bold text-secondary">
                        {shownModules}
                      </span>{" "}
                      {plural(shownModules, "module", "modules")}
                    </p>
                  )}

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Selected topic heading */}
                      {selectedTopic && activeId !== "all" && (
                        <div className="mb-6">
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary-dark">
                            Topic
                          </p>

                          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-secondary sm:text-3xl">
                            {selectedTopic.title}
                          </h2>

                          {selectedTopic.description && (
                            <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">
                              {selectedTopic.description}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Topics */}
                      {visibleTopics.map((topic) => (
                        <section
                          key={topic._id}
                          data-topic-id={topic._id}
                          className="mb-10"
                        >
                          {activeId === "all" && (
                            <div className="mb-4 flex items-end justify-between gap-4">
                              <div>
                                <h2 className="font-display text-xl font-bold text-secondary sm:text-2xl">
                                  {topic.title}
                                </h2>

                                {topic.description && (
                                  <p className="mt-1 text-sm text-text-secondary">
                                    {topic.description}
                                  </p>
                                )}
                              </div>

                              <span className="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                                {topic.lessons.length}{" "}
                                {plural(
                                  topic.lessons.length,
                                  "module",
                                  "modules",
                                )}
                              </span>
                            </div>
                          )}

                          {topic.lessons.length > 0 ? (
                            <div className="relative divide-y divide-border-light overflow-hidden rounded-2xl border border-border-light bg-surface shadow-[var(--shadow-sm)]">
                              <AnimatePresence mode="popLayout">
                                {topic.lessons.map((lesson, index) => (
                                  <ModuleRow
                                    key={lesson._id}
                                    lesson={lesson}
                                    topicId={topic._id}
                                    index={index}
                                  />
                                ))}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center">
                              <BookOpen
                                className="mx-auto h-7 w-7 text-text-muted"
                                aria-hidden="true"
                              />

                              <p className="mt-3 text-sm font-semibold text-secondary">
                                No modules available
                              </p>
                            </div>
                          )}
                        </section>
                      ))}

                      {/* Empty state */}
                      {filteredTopics.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="flex flex-col items-center rounded-3xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center"
                        >
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lesson-orange text-primary-dark">
                            {hasFilters ? (
                              <SearchX className="h-8 w-8" aria-hidden="true" />
                            ) : (
                              <BookOpen
                                className="h-8 w-8"
                                aria-hidden="true"
                              />
                            )}
                          </span>

                          <h2 className="mt-4 font-display text-lg font-bold text-secondary">
                            {hasFilters ? "Nothing found" : "No lessons yet"}
                          </h2>

                          <p className="mt-1 max-w-sm text-sm text-text-secondary">
                            {hasFilters
                              ? "Try a different search or remove a filter."
                              : "Published lessons will appear here."}
                          </p>

                          {hasFilters && (
                            <button
                              type="button"
                              onClick={clearFilters}
                              className={`mt-5 ${outlineBtn}`}
                            >
                              Clear filters
                            </button>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </section>
              </div>
            </>
          )}
        </div>
      </main>
    </MotionConfig>
  );
}
