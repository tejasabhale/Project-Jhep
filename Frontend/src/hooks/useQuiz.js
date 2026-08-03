import { useEffect, useState } from "react";

import { getQuizByLesson } from "../api/quiz.api";

export default function useQuiz(lessonId) {
  const [quiz, setQuiz] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lessonId) return;

    const loadQuiz = async () => {
      try {
        const data = await getQuizByLesson(lessonId);

        setQuiz(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [lessonId]);

  return {
    quiz,
    loading,
    error,
  };
}
