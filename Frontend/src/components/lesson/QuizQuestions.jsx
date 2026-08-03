import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";

export default function QuizQuestions({ quiz, onFinish, onBack }) {
  const questions = quiz?.questions || [];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return ((current + 1) / questions.length) * 100;
  }, [current, questions.length]);

  const selectOption = (index) => {
    setAnswers((prev) => ({
      ...prev,
      [current]: index,
    }));
  };

  const submitQuiz = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    questions.forEach((question, index) => {
      const points = question.points || 1;
      totalPoints += points;
      if (answers[index] === question.answer) {
        earnedPoints += points;
      }
    });
    onFinish(earnedPoints, totalPoints);
  };

  if (!questions.length) {
    return <EmptyState message="No quiz questions available." />;
  }

  const question = questions[current];

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-orange-600 transition hover:bg-orange-100"
      >
        <ArrowLeft size={18} />
        Back to overview
      </button>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span>
            Question {current + 1} / {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-orange-100">
          <div
            className="h-full rounded-full bg-orange-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card>
        <h2 className="mb-8 text-2xl font-bold text-slate-800">
          {question.question}
        </h2>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectOption(index)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                answers[current] === index
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-8 flex justify-between">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
          className="rounded-xl border px-6 py-3 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 inline" size={18} />
          Previous
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            className="rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            <CheckCircle2 className="mr-2 inline" size={18} />
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrent(current + 1)}
            className="rounded-xl bg-orange-500 px-6 py-3 text-white"
          >
            Next
            <ArrowRight className="ml-2 inline" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
