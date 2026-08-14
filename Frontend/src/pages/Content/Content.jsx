import React, { useEffect, useMemo, useRef, useState } from "react";

import { Search } from "lucide-react";

import { getLessonsByTopic } from "../../api/lesson.api";
import { getAllTopics } from "../../api/topic.api";

import { TopicCard } from "../../components/content/TopicCard";
import { ContentViewerModal } from "../../components/content/ContentViewerModal";

const Content = () => {
  const [topics, setTopics] = useState([]);
  const [openTopics, setOpenTopics] = useState(new Set());

  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageRef = useRef(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllTopics();

        const topicList = response?.data?.topics ?? [];

        const publishedTopics = topicList.filter(
          (topic) => topic.isPublished === true,
        );

        const topicsWithLessons = await Promise.all(
          publishedTopics.map(async (topic) => {
            try {
              const lessonResponse = await getLessonsByTopic(topic._id);

              const lessons = lessonResponse?.data?.lessons ?? [];

              const publishedLessons = lessons.filter(
                (lesson) => lesson.isPublished === true,
              );

              return {
                ...topic,
                lessons: publishedLessons,
              };
            } catch (error) {
              console.error(`Failed to load lessons for ${topic.title}`, error);

              return {
                ...topic,
                lessons: [],
              };
            }
          }),
        );

        setTopics(topicsWithLessons);

        setOpenTopics(new Set());
      } catch (error) {
        console.error("Failed to load content:", error);

        setError(error?.response?.data?.message || "Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const toggleTopic = (id) => {
    setOpenTopics((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTopics = useMemo(() => {
    if (!normalizedQuery) {
      return topics;
    }

    return topics
      .map((topic) => {
        const topicMatches =
          topic.title?.toLowerCase().includes(normalizedQuery) ||
          topic.description?.toLowerCase().includes(normalizedQuery);

        const matchingLessons = (topic.lessons ?? []).filter(
          (lesson) =>
            lesson.title?.toLowerCase().includes(normalizedQuery) ||
            lesson.description?.toLowerCase().includes(normalizedQuery) ||
            lesson.file?.name?.toLowerCase().includes(normalizedQuery),
        );

        if (topicMatches || matchingLessons.length > 0) {
          return {
            ...topic,
            lessons: topicMatches ? topic.lessons : matchingLessons,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [topics, normalizedQuery]);

  const totalModules = topics.reduce(
    (sum, topic) => sum + (topic.lessons?.length ?? 0),
    0,
  );

  return (
    <div
      ref={pageRef}
      className="min-h-screen font-sans antialiased"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
            Course Content
          </p>

          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Lesson Library
              </h1>

              <p className="mt-1.5 text-sm text-slate-500">
                Explore topics and learning modules.
              </p>
            </div>

            <p className="text-sm font-medium text-slate-500">
              {topics.length} {topics.length === 1 ? "topic" : "topics"} ·{" "}
              {totalModules} {totalModules === 1 ? "module" : "modules"}
            </p>
          </div>
        </div>

        <div className="relative mb-8">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search topics, modules, or files..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 shadow-sm transition-all placeholder:text-slate-400 focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
            <p className="text-sm text-slate-500">Loading course content...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 py-16 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic._id}
                topic={topic}
                isOpen={openTopics.has(topic._id)}
                onToggle={() => toggleTopic(topic._id)}
                onOpenItem={setActiveItem}
              />
            ))}

            {filteredTopics.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
                <p className="text-sm font-medium text-slate-500">
                  {query
                    ? `No content matches "${query}"`
                    : "No published content available."}
                </p>

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mt-2 cursor-pointer text-xs font-semibold text-orange-600 underline hover:text-orange-700"
                  >
                    Clear search filter
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <ContentViewerModal
        activeItem={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </div>
  );
};

export default Content;
