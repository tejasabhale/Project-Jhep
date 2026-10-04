import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Loader2,
  PartyPopper,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";

import { getQuizById, submitQuiz } from "../../api/quiz.api";

const OPTION_LABELS = ["A", "B", "C", "D"];
const EASE = [0.22, 1, 0.36, 1];
const DEFAULT_DURATION_SECONDS = 15 * 60;

const CONFETTI_COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--warning)",
  "var(--success)",
  "var(--info)",
  "var(--primary-dark)",
];

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary-dark px-6 py-3 text-sm font-bold !text-white transition-colors duration-200 hover:bg-primary focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold text-secondary transition-colors duration-200 hover:border-primary hover:text-primary-dark focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-40";

const backBtn =
  "group inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-text-secondary transition-colors duration-200 hover:text-primary-dark";

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
};

const getDurationSeconds = (quizData) => {
  const seconds = Number(quizData?.durationMinutes) * 60;

  return Number.isFinite(seconds) && seconds > 0
    ? seconds
    : DEFAULT_DURATION_SECONDS;
};

/* Solid quarter-circle centered on a page corner, in --primary at low opacity */
function Arc({ className, cx, cy }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute h-44 w-44 md:h-64 md:w-64 ${className}`}
    >
      <circle
        cx={cx}
        cy={cy}
        r={170}
        className="fill-primary"
        fillOpacity="0.08"
      />
    </svg>
  );
}

/* Shared page wrapper: cream background with faint corner arcs */
function PageShell({ children, className = "" }) {
  return (
    <main
      className={`relative min-h-[100svh] overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8 ${className}`}
    >
      <Arc className="right-0 top-0" cx={200} cy={0} />
      <Arc className="bottom-0 left-0" cx={0} cy={200} />

      <div className="relative z-10 w-full">{children}</div>
    </main>
  );
}

/* Score shown as a progress ring */
function ScoreRing({ score, passed, reduce }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(100, Math.max(0, score));
  const target = circumference * (1 - percent / 100);

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg
        viewBox="0 0 160 160"
        aria-hidden="true"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="12"
          className={passed ? "stroke-success-light" : "stroke-error-light"}
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: reduce ? target : circumference }}
          animate={{ strokeDashoffset: target }}
          transition={{
            duration: reduce ? 0 : 1.2,
            delay: reduce ? 0 : 0.3,
            ease: EASE,
          }}
          className={passed ? "stroke-success" : "stroke-error"}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p
          className={`font-display text-5xl font-extrabold tracking-tight ${
            passed ? "text-success" : "text-error"
          }`}
        >
          {score}%
        </p>

        <p
          className={`mt-1 text-sm font-bold ${
            passed ? "text-success" : "text-error"
          }`}
        >
          {passed ? "You Passed!" : "Keep Practicing!"}
        </p>
      </div>
    </div>
  );
}

export default function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);

      const response = await getQuizById(quizId);

      const quizData = response?.data?.data || response?.data || response;

      if (!quizData) {
        throw new Error("Quiz not found.");
      }

      setQuiz(quizData);
      setTimeLeft(getDurationSeconds(quizData));
      setCurrentQuestion(0);
      setAnswers({});
      setSubmitted(false);
      setSubmissionResult(null);
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to load quiz");

      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const questions = quiz?.questions || [];
  const totalQuestions = questions.length;
  const current = questions[currentQuestion];

  const answeredCount = useMemo(
    () =>
      Object.keys(answers).filter(
        (key) => answers[key] !== null && answers[key] !== undefined,
      ).length,
    [answers],
  );

  const unanswered = totalQuestions - answeredCount;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isCurrentAnswered = answers[currentQuestion] !== undefined;

  const answerProgress =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const handleSelectAnswer = (optionIndex) => {
    if (submitted) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) {
      toast.error("Please select an answer first.");
      return;
    }

    if (!isLastQuestion) {
      setCurrentQuestion((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      scrollToTop();
    }
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestion(index);
    scrollToTop();
  };

  /* Sends the answers to the API */
  const submitAnswers = async (autoSubmit = false) => {
    if (submitting || submitted) {
      return;
    }

    try {
      setSubmitting(true);
      setConfirmOpen(false);

      const formattedAnswers = questions.map((question, index) => ({
        questionId: question._id,
        selectedOption: answers[index] ?? null,
      }));

      const response = await submitQuiz(quizId, formattedAnswers);

      const result = response?.data?.data || response?.data || response;

      if (!result) {
        throw new Error("Quiz result was not returned.");
      }

      setSubmissionResult(result);
      setSubmitted(true);
      setTimeLeft(0);

      toast.success(
        autoSubmit
          ? "Time is up. Quiz submitted successfully."
          : "Quiz submitted successfully.",
      );

      scrollToTop();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  /* Submit button: ask first if some questions are unanswered */
  const handleSubmit = () => {
    if (submitting || submitted) {
      return;
    }

    if (unanswered > 0) {
      setConfirmOpen(true);
      return;
    }

    submitAnswers(false);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
    setSubmissionResult(null);
    setConfirmOpen(false);
    setTimeLeft(getDurationSeconds(quiz));

    scrollToTop();
  };

  useEffect(() => {
    if (timeLeft === null || submitted || loading) {
      return;
    }

    if (timeLeft <= 0) {
      submitAnswers(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) {
          return prev;
        }

        return Math.max(0, prev - 1);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, loading]);

  /* Escape closes the confirm dialog */
  useEffect(() => {
    if (!confirmOpen) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setConfirmOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmOpen]);

  const confettiPieces = useMemo(() => {
    return Array.from({ length: 42 }, (_, index) => {
      const seed = index + 7;

      return {
        id: index,
        left: (seed * 37) % 100,
        delay: ((seed * 17) % 18) / 10,
        duration: 2.4 + ((seed * 13) % 20) / 10,
        size: 7 + ((seed * 11) % 7),
        rotate: (seed * 43) % 360,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        shape: index % 3 === 0 ? "rounded-full" : "rounded-[2px]",
      };
    });
  }, []);

  /* ===================== Loading ===================== */
  if (loading) {
    return (
      <PageShell className="flex items-center justify-center">
        <div
          role="status"
          className="mx-auto w-full max-w-md rounded-3xl border border-border-light bg-surface p-10 text-center shadow-[var(--shadow-md)]"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lesson-orange text-primary-dark motion-safe:animate-pulse">
            <Sparkles size={28} aria-hidden="true" />
          </div>

          <h2 className="mt-7 font-display text-xl font-bold text-secondary">
            Preparing your quiz
          </h2>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-text-secondary">
            Loading your questions and getting everything ready.
          </p>

          <div className="mt-7 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full w-1/2 rounded-full bg-primary motion-safe:animate-pulse" />
          </div>
        </div>
      </PageShell>
    );
  }

  /* ===================== Not available ===================== */
  if (!quiz || !current) {
    return (
      <PageShell className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border-light bg-surface p-10 text-center shadow-[var(--shadow-md)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-error-light text-error">
            <CircleHelp size={30} aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-display text-xl font-bold text-secondary">
            Quiz not available
          </h2>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            This quiz could not be loaded right now.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`mt-7 ${primaryBtn}`}
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Go Back
          </button>
        </div>
      </PageShell>
    );
  }

  /* ===================== Result ===================== */
  if (submitted && submissionResult) {
    const score = Number(submissionResult.score) || 0;
    const passed = Boolean(submissionResult.passed);

    return (
      <PageShell>
        <style>{`
          @keyframes confettiFall {
            0% {
              transform: translate3d(0, -20vh, 0) rotate(0deg) scale(1);
              opacity: 1;
            }
            60% {
              opacity: 1;
            }
            100% {
              transform: translate3d(var(--drift), 115vh, 0) rotate(720deg) scale(0.9);
              opacity: 0;
            }
          }

          @keyframes celebrationPop {
            0% { transform: scale(0.7); opacity: 0; }
            70% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }

          .confetti-piece {
            animation-name: confettiFall;
            animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
            animation-fill-mode: forwards;
          }

          .celebration-pop {
            animation: celebrationPop 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .celebration-pop { animation: none; }
          }
        `}</style>

        {/* Confetti (skipped for reduced motion) */}
        {passed && !reduce && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          >
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className={`confetti-piece absolute top-[-30px] ${piece.shape}`}
                style={{
                  left: `${piece.left}%`,
                  width: `${piece.size}px`,
                  height: `${piece.size * 1.5}px`,
                  backgroundColor: piece.color,
                  animationDelay: `${piece.delay}s`,
                  animationDuration: `${piece.duration}s`,
                  transform: `rotate(${piece.rotate}deg)`,
                  "--drift": `${
                    (piece.id % 2 === 0 ? 1 : -1) *
                    (35 + ((piece.id * 19) % 90))
                  }px`,
                }}
              />
            ))}
          </div>
        )}

        <div className="mx-auto max-w-6xl">
          {/* Top bar */}
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={backBtn}
            >
              <ArrowLeft
                size={17}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Back to Lesson
            </button>

            <div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-primary-dark sm:flex">
              <Sparkles size={14} aria-hidden="true" />
              Quiz Complete
            </div>
          </div>

          {/* Result card */}
          <section className="rounded-3xl border border-border-light bg-surface px-6 pb-10 pt-10 text-center shadow-[var(--shadow-md)] sm:px-10">
            <div
              className={`celebration-pop mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] ${
                passed
                  ? "bg-warning-light text-warning"
                  : "bg-lesson-orange text-primary-dark"
              }`}
            >
              {passed ? (
                <Trophy size={46} aria-hidden="true" />
              ) : (
                <Target size={44} aria-hidden="true" />
              )}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-primary-light px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary-dark">
              <PartyPopper size={14} aria-hidden="true" />
              Result
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              {quiz.title}
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-text-secondary">
              Here is how you performed in this quiz.
            </p>

            <div className="mt-9">
              <ScoreRing score={score} passed={passed} reduce={reduce} />
            </div>

            {passed && (
              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-success-light px-4 py-2 text-xs font-bold text-secondary">
                <Trophy size={14} aria-hidden="true" className="text-success" />
                Great work! Keep learning.
              </div>
            )}

            <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-surface-muted px-4 py-2 text-xs font-semibold text-text-secondary">
              Passing score:
              <span className="font-bold text-secondary">
                {submissionResult.passingScore}%
              </span>
            </div>

            {/* Stats */}
            <dl className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border-light bg-success-light p-5">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-success text-white">
                  <Check size={20} aria-hidden="true" />
                </div>
                <dt className="mt-3 text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Correct
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-secondary">
                  {submissionResult.correctAnswers}
                </dd>
              </div>

              <div className="rounded-2xl border border-border-light bg-lesson-orange p-5">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary-dark text-white">
                  <CheckCircle2 size={20} aria-hidden="true" />
                </div>
                <dt className="mt-3 text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Answered
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-secondary">
                  {submissionResult.answeredQuestions}
                </dd>
              </div>

              <div className="rounded-2xl border border-border-light bg-info-light p-5">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-info text-white">
                  <BookOpen size={20} aria-hidden="true" />
                </div>
                <dt className="mt-3 text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Total
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-secondary">
                  {submissionResult.totalQuestions}
                </dd>
              </div>
            </dl>

            {/* Actions */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRetry}
                className={outlineBtn}
              >
                <RotateCcw size={17} aria-hidden="true" />
                Retake Quiz
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className={primaryBtn}
              >
                <ArrowLeft size={17} aria-hidden="true" />
                Back to Lesson
              </button>
            </div>
          </section>

          {/* Review */}
          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-light px-3 py-1.5 text-xs font-bold text-primary-dark">
                  <Zap size={13} aria-hidden="true" />
                  Learn from your attempt
                </div>

                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-secondary">
                  Answer Review
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Review each answer and understand why it is correct.
                </p>
              </div>

              <div className="hidden rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-text-secondary sm:block">
                {submissionResult.correctAnswers}/
                {submissionResult.totalQuestions} correct
              </div>
            </div>

            <ol className="space-y-5">
              {submissionResult.review?.map((item) => (
                <motion.li
                  key={item.questionId}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <article className="overflow-hidden rounded-3xl border border-border-light bg-surface shadow-[var(--shadow-sm)]">
                    <header className="border-b border-border-light px-5 py-5 sm:px-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 gap-4">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${
                              item.isCorrect
                                ? "bg-success-light text-success"
                                : "bg-error-light text-error"
                            }`}
                          >
                            {String(item.questionNumber).padStart(2, "0")}
                          </div>

                          <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-dark">
                              Question {item.questionNumber}
                            </p>

                            <h3 className="mt-1.5 text-base font-bold leading-7 text-secondary sm:text-lg">
                              {item.question}
                            </h3>
                          </div>
                        </div>

                        <div
                          role="img"
                          aria-label={item.isCorrect ? "Correct" : "Incorrect"}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            item.isCorrect
                              ? "bg-success-light text-success"
                              : "bg-error-light text-error"
                          }`}
                        >
                          {item.isCorrect ? (
                            <Check size={20} aria-hidden="true" />
                          ) : (
                            <X size={20} aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </header>

                    <div className="px-5 py-5 sm:px-7 sm:py-6">
                      <ul className="space-y-3">
                        {item.options.map((option, optionIndex) => {
                          const isSelected =
                            item.selectedOption === optionIndex;
                          const isCorrect = item.correctOption === optionIndex;

                          return (
                            <li
                              key={optionIndex}
                              className={`flex items-center gap-3 rounded-2xl border p-3.5 sm:p-4 ${
                                isCorrect
                                  ? "border-success/40 bg-success-light"
                                  : isSelected
                                    ? "border-error/40 bg-error-light"
                                    : "border-border-light bg-background"
                              }`}
                            >
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                                  isCorrect
                                    ? "bg-success text-white"
                                    : isSelected
                                      ? "bg-error text-white"
                                      : "border border-border-light bg-surface text-text-secondary"
                                }`}
                              >
                                {OPTION_LABELS[optionIndex]}
                              </span>

                              <span className="min-w-0 flex-1 text-sm font-semibold leading-6 text-secondary">
                                {option}
                              </span>

                              {isCorrect && (
                                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-success/40 bg-surface px-3 py-1 text-[11px] font-bold text-secondary sm:flex">
                                  <Check
                                    size={12}
                                    aria-hidden="true"
                                    className="text-success"
                                  />
                                  Correct
                                </span>
                              )}

                              {isSelected && !isCorrect && (
                                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-error/40 bg-surface px-3 py-1 text-[11px] font-bold text-secondary sm:flex">
                                  <X
                                    size={12}
                                    aria-hidden="true"
                                    className="text-error"
                                  />
                                  Your Answer
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border-light bg-background p-4">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                            Your Answer
                          </p>

                          <p className="mt-2 text-sm font-bold text-secondary">
                            {item.selectedAnswer || "Not answered"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-success/30 bg-success-light p-4">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                            Correct Answer
                          </p>

                          <p className="mt-2 text-sm font-bold text-secondary">
                            {item.correctAnswer}
                          </p>
                        </div>
                      </div>

                      {item.explanation && (
                        <div className="mt-4 rounded-2xl border border-info/30 bg-info-light p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-info text-white">
                              <Sparkles size={17} aria-hidden="true" />
                            </div>

                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                                Explanation
                              </p>

                              <p className="mt-1.5 text-sm leading-6 text-secondary">
                                {item.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                </motion.li>
              ))}
            </ol>
          </section>
        </div>
      </PageShell>
    );
  }

  /* ===================== Taking the quiz ===================== */
  const selectedAnswer = answers[currentQuestion];
  const isTimeCritical = timeLeft !== null && timeLeft <= 60;

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-5 rounded-3xl border border-border-light bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`mb-3 ${backBtn}`}
              >
                <ArrowLeft
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                Back to Lesson
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lesson-orange text-primary-dark sm:flex">
                  <BookOpen size={22} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h1 className="truncate font-display text-2xl font-extrabold tracking-tight text-secondary">
                    {quiz.title}
                  </h1>

                  {quiz.description && (
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-text-secondary">
                      {quiz.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Timer */}
            <div
              role="timer"
              aria-label={`Time left ${formatTime(timeLeft)}`}
              className={`flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-3 ${
                isTimeCritical
                  ? "border-error/30 bg-error-light text-error"
                  : "border-border bg-lesson-orange text-primary-dark"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${
                  isTimeCritical
                    ? "bg-error motion-safe:animate-pulse"
                    : "bg-primary-dark"
                }`}
              >
                <Clock3 size={19} aria-hidden="true" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em]">
                  Time Left
                </p>

                <p className="mt-0.5 font-display text-lg font-extrabold tabular-nums">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="mb-2.5 flex items-center justify-between text-xs font-bold text-text-secondary">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>

              <span>
                {answeredCount}/{totalQuestions} answered
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Questions answered"
              aria-valuemin={0}
              aria-valuemax={totalQuestions}
              aria-valuenow={answeredCount}
              className="h-2.5 overflow-hidden rounded-full bg-surface-muted"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out motion-reduce:transition-none"
                style={{ width: `${answerProgress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_270px]">
          {/* Main question */}
          <section className="rounded-3xl border border-border-light bg-surface p-5 shadow-[var(--shadow-md)] sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-dark">
                  <Sparkles size={13} aria-hidden="true" />
                  Question {String(currentQuestion + 1).padStart(2, "0")}
                </div>

                <h2
                  id={`question-${currentQuestion}`}
                  className="mt-4 font-display text-xl font-bold leading-8 tracking-tight text-secondary sm:text-2xl sm:leading-9"
                >
                  {current.question}
                </h2>

                {/* Options: native radio inputs, so arrow keys work */}
                <fieldset
                  aria-labelledby={`question-${currentQuestion}`}
                  className="mt-8 min-w-0 space-y-3 border-0 p-0"
                >
                  {current.options.map((option, optionIndex) => {
                    const isSelected = selectedAnswer === optionIndex;

                    return (
                      <label
                        key={optionIndex}
                        className={`group relative flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface ${
                          isSelected
                            ? "border-primary bg-lesson-orange"
                            : "border-border-light bg-surface hover:border-primary/50 hover:bg-background"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          checked={isSelected}
                          onChange={() => handleSelectAnswer(optionIndex)}
                          className="sr-only"
                        />

                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors duration-200 ${
                            isSelected
                              ? "bg-primary-dark text-white"
                              : "bg-surface-muted text-text-secondary group-hover:bg-lesson-orange group-hover:text-primary-dark"
                          }`}
                        >
                          {OPTION_LABELS[optionIndex]}
                        </span>

                        <span className="min-w-0 flex-1 text-sm font-semibold leading-6 text-secondary">
                          {option}
                        </span>

                        <span
                          aria-hidden="true"
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity duration-200 ${
                            isSelected
                              ? "bg-primary-dark text-white opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <Check size={16} />
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex flex-col gap-3 border-t border-border-light pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={outlineBtn}
              >
                <ArrowLeft size={17} aria-hidden="true" />
                Previous
              </button>

              {isLastQuestion ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={primaryBtn}
                >
                  {submitting ? (
                    <Loader2
                      size={17}
                      aria-hidden="true"
                      className="animate-spin"
                    />
                  ) : (
                    <Send size={17} aria-hidden="true" />
                  )}

                  {submitting ? "Submitting..." : "Submit Quiz"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className={primaryBtn}
                >
                  Next
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              )}
            </div>
          </section>

          {/* Navigator */}
          <aside className="h-fit rounded-3xl border border-border-light bg-surface p-5 shadow-[var(--shadow-sm)] lg:sticky lg:top-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-secondary">
                  Questions
                </h3>

                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Jump between questions.
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lesson-orange text-primary-dark">
                <Zap size={16} aria-hidden="true" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-background p-4">
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-text-secondary">
                <span>Progress</span>

                <span>{Math.round(answerProgress)}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none"
                  style={{ width: `${answerProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-4">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isActive = currentQuestion === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleQuestionJump(index)}
                    aria-label={`Go to question ${index + 1}${
                      isAnswered ? ", answered" : ""
                    }`}
                    aria-current={isActive ? "step" : undefined}
                    className={`relative flex h-11 items-center justify-center rounded-xl text-xs font-bold transition-colors duration-200 ${
                      isActive
                        ? "bg-primary-dark text-white"
                        : isAnswered
                          ? "bg-success-light text-secondary ring-1 ring-success/40 hover:bg-surface-muted"
                          : "bg-surface-muted text-text-secondary hover:bg-lesson-orange hover:text-primary-dark"
                    }`}
                  >
                    {index + 1}

                    {isAnswered && !isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-success"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-2 border-t border-border-light pt-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <span className="h-3 w-3 rounded-md bg-primary-dark" />
                Current
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <span className="h-3 w-3 rounded-md bg-success-light ring-1 ring-success/40" />
                Answered
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <span className="h-3 w-3 rounded-md bg-surface-muted" />
                Not answered
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-lesson-orange p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-dark text-white">
                  <Target size={17} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-xs font-bold text-text-secondary">
                    Passing Score
                  </p>

                  <p className="font-display text-lg font-extrabold text-primary-dark">
                    {quiz.passingScore}%
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 pb-3 text-xs font-semibold text-text-muted">
          <Sparkles size={13} aria-hidden="true" />
          Take your time, think carefully, and do your best!
        </div>
      </div>

      {/* Unanswered confirmation (replaces window.confirm) */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-dark/50 p-4"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-text"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-border-light bg-surface p-6 shadow-[var(--shadow-lg)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning-light text-warning">
              <CircleHelp size={24} aria-hidden="true" />
            </div>

            <h2
              id="confirm-title"
              className="mt-4 font-display text-xl font-bold text-secondary"
            >
              Submit quiz?
            </h2>

            <p
              id="confirm-text"
              className="mt-2 text-sm leading-6 text-text-secondary"
            >
              {unanswered} {unanswered === 1 ? "question is" : "questions are"}{" "}
              unanswered. Submit anyway?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmOpen(false)}
                className={outlineBtn}
              >
                Keep answering
              </button>

              <button
                type="button"
                onClick={() => submitAnswers(false)}
                className={primaryBtn}
              >
                Submit anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
