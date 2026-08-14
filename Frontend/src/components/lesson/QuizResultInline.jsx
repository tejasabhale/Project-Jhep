import {
  CheckCircle2,
  RotateCcw,
  ArrowLeft,
  Award,
  Target,
} from "lucide-react";

import Card from "../../components/common/Card";

export default function QuizResultInline({
  quiz,
  earnedPoints = 0,
  totalPoints = 0,
  onRetry,
  onBack,
}) {
  const score = Number(earnedPoints);
  const total = Number(totalPoints);

  const percentage = total ? Math.round((score / total) * 100) : 0;

  const passingMarks =
    quiz?.passingMarks ??
    quiz?.metadata?.passingMarks ??
    Math.ceil(total * 0.6);

  const passed = score >= passingMarks;

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-orange-600 transition hover:bg-orange-50"
      >
        <ArrowLeft size={18} />
        Back to Overview
      </button>

      <Card>
        <div className="overflow-hidden rounded-3xl border border-orange-100">
          <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 px-8 py-10 text-center">
            <div
              className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full shadow-sm ${
                passed
                  ? "bg-green-100 text-green-600"
                  : "bg-orange-100 text-orange-500"
              }`}
            >
              <CheckCircle2 size={50} />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-800">
              Quiz Completed!
            </h1>

            <p className="mt-3 text-slate-600">
              {passed
                ? "Congratulations! You performed well."
                : "Good effort! Review the lesson and try again."}
            </p>
          </div>

          <div className="grid gap-5 border-t border-orange-100 bg-white p-8 md:grid-cols-2">
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 text-center">
              <Target className="mx-auto text-orange-500" size={32} />

              <p className="mt-3 text-sm text-slate-500">Your Score</p>

              <h2 className="mt-2 text-4xl font-bold text-orange-500">
                {score} / {total}
              </h2>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 text-center">
              <Award className="mx-auto text-orange-500" size={32} />

              <p className="mt-3 text-sm text-slate-500">Percentage</p>

              <h2 className="mt-2 text-4xl font-bold text-orange-500">
                {percentage}%
              </h2>
            </div>
          </div>

          <div className="border-t border-orange-100 bg-orange-50/50 px-8 py-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={onBack}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-3 font-medium text-orange-600 transition hover:bg-orange-50"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                onClick={onRetry}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-400 px-5 py-3 font-medium text-white transition hover:bg-orange-500"
              >
                <RotateCcw size={18} />
                Retry Quiz
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
