import { useState, useEffect, useCallback } from "react";

import { getLessonById } from "../api/lesson.api";

export default function useLesson(lessonId) {
  const [lesson, setLesson] = useState(null);
  const [contents, setContents] = useState([]);
  const [quiz, setQuiz] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLesson = useCallback(async () => {
    if (!lessonId) return;

    try {
      setLoading(true);
      setError("");

      const response = await getLessonById(lessonId);

      const lessonData = response?.data?.lesson;
      const lessonContents = response?.data?.contents || [];

      setLesson(lessonData);

      // Everything except quiz goes to Content tab
      setContents(lessonContents.filter((item) => item.blockType !== "quiz"));

      // Quiz block
      const quizBlock = lessonContents.find(
        (item) => item.blockType === "quiz",
      );

      setQuiz(quizBlock?.metadata || null);
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
    quiz,
    loading,
    error,
    retry: loadLesson,
  };
}
