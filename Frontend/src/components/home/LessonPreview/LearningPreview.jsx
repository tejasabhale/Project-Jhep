import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Reveal from "../../ui/Reveal";
import LessonPreviewCard from "./LessonPreviewCard";
import { getFeaturedLessons } from "../../../api/lesson.api";

export default function LearningPreview() {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedLessons();
  }, []);

  const loadFeaturedLessons = async () => {
    try {
      setLoading(true);

      const response = await getFeaturedLessons();

      const list = response?.data?.lessons || response?.data || [];

      setLessons(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to load featured lessons",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{
                background: "#FFEEE0",
                color: "#C2410C",
              }}
            >
              Explore & Learn
            </span>

            <h2
              className="mt-5 text-3xl font-semibold md:text-[2.5rem] md:leading-[1.15]"
              style={{
                color: "#17213B",
                fontFamily: "'Fraunces', serif",
              }}
            >
              Learn English Through{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF7A30, #EA580C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Real Conversations
              </span>
            </h2>

            <p
              className="mt-4 text-sm leading-7 md:text-base"
              style={{
                color: "#5B6472",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Explore simple lessons designed to help students understand,
              practice, and use English in everyday situations.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <Loader2
              size={30}
              className="animate-spin"
              style={{
                color: "#EA580C",
              }}
            />
          </div>
        ) : lessons.length === 0 ? (
          <div className="rounded-2xl border border-orange-100 bg-[#FFFAF5] px-6 py-12 text-center">
            <p
              className="text-sm"
              style={{
                color: "#6B7280",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Featured lessons will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <Reveal key={lesson._id}>
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
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="group inline-flex items-center gap-2 rounded-xl border bg-white px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFF1E4]"
              style={{
                borderColor: "#FBDBBE",
                color: "#C2410C",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Explore All Lessons
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
