import { CheckCircle2, RotateCcw, ArrowLeft } from "lucide-react";

import Card from "../../components/common/Card";

export default function QuizResultInline({
  quiz,
  earnedPoints,
  totalPoints,
  onRetry,
  onBack,
}) {
  const percentage = totalPoints
    ? Math.round((earnedPoints / totalPoints) * 100)
    : 0;

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-orange-600 transition hover:bg-orange-100"
      >
        <ArrowLeft size={18} />
        Back to overview
      </button>

      <Card>
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 size={70} className="mb-5 text-green-600" />
          <h1 className="text-3xl font-bold text-slate-800">Quiz Completed!</h1>
          <p className="mt-4 text-slate-600">You scored</p>
          <div className="mt-4 text-5xl font-extrabold text-orange-600">
            {earnedPoints}/{totalPoints}
          </div>
          <p className="mt-3 text-lg font-semibold text-slate-700">
            {percentage}% Score
          </p>
          <div className="mt-8 flex w-full gap-4">
            <button
              onClick={onBack}
              className="flex-1 rounded-xl border border-orange-200 px-5 py-3 text-orange-600 transition hover:bg-orange-50"
            >
              <ArrowLeft className="inline mr-2" size={18} />
              Back
            </button>
            <button
              onClick={onRetry}
              className="flex-1 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600"
            >
              <RotateCcw className="inline mr-2" size={18} />
              Retry
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
