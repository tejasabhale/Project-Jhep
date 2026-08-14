import { useState, useEffect, useCallback } from "react";

import { getLessonById } from "../api/lesson.api";

export default function useLesson(lessonId) {
  const [lesson, setLesson] = useState(null);

  const [contents, setContents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadLesson = useCallback(async () => {
    if (!lessonId) return;

    try {
      setLoading(true);

      setError("");

      const response = await getLessonById(lessonId);

      const lessonData =
        response?.data?.lesson || response?.data?.data || response?.data;

      const lessonContents = response?.data?.contents || [];

      setLesson(lessonData);

      // Only PPT / PDF / Video content
      setContents(lessonContents.filter((item) => item.blockType !== "quiz"));
    } catch (err) {
      console.error("Lesson Load Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load lesson. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  return {
    lesson,

    contents,

    loading,

    error,

    retry: loadLesson,
  };
}
