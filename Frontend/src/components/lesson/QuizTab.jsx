import { useState } from "react";
import { CheckCircle, XCircle, RefreshCw, ClipboardList } from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";

export default function QuizTab({ quiz }) {
  if (!quiz?.questions || quiz.questions.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        message="No quiz available for this lesson."
      />
    );
  }

  const questions = quiz.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  const submitAnswer = () => {
    if (selectedAnswer === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setCompleted(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="mx-auto max-w-xl text-center py-10">
        <CheckCircle className="mx-auto text-green-500" size={60} />

        <h2 className="mt-5 text-3xl font-bold">Quiz Completed</h2>

        <p className="mt-3 text-slate-600">You scored</p>

        <h1 className="mt-2 text-6xl font-extrabold text-orange-500">
          {percentage}%
        </h1>

        <p className="mt-4 text-slate-600">
          {score} / {questions.length} Correct
        </p>

        <Button className="mt-8" onClick={restartQuiz}>
          <RefreshCw size={18} className="mr-2" />
          Retry Quiz
        </Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Question {currentQuestion + 1}</h2>

        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      <Card>
        <h3 className="mb-8 text-2xl font-bold text-slate-800">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            const selected = selectedAnswer === index;
            const correct = index === question.correctAnswer;

            let style = "border-slate-200 hover:border-orange-300";

            if (submitted) {
              if (correct) {
                style = "border-green-400 bg-green-50";
              } else if (selected) {
                style = "border-red-400 bg-red-50";
              }
            } else if (selected) {
              style = "border-orange-500 bg-orange-50";
            }

            return (
              <button
                key={index}
                disabled={submitted}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full rounded-xl border-2 p-5 text-left transition ${style}`}
              >
                <div className="flex items-center">
                  <span className="flex-1">{option}</span>

                  {submitted && correct && (
                    <CheckCircle className="text-green-500" size={20} />
                  )}

                  {submitted && selected && !correct && (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          {!submitted ? (
            <Button disabled={selectedAnswer === null} onClick={submitAnswer}>
              Submit
            </Button>
          ) : (
            <Button onClick={nextQuestion}>
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
