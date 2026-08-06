import {
  ClipboardCheck,
  HelpCircle,
  Play,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

export default function QuizTab({ quiz, onStart }) {
  if (!quiz) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        message="No quiz has been added for this lesson yet."
      />
    );
  }

  const totalQuestions = quiz?.questions?.length || 0;

  return (
    <Card>
      <div className="space-y-10">
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50">
          <div className="flex flex-col items-center gap-6 px-8 py-10 text-center md:flex-row md:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 shadow-sm">
              <ClipboardCheck size={40} />
            </div>

            <div className="flex-1">
              <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                Lesson Quiz
              </span>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                {quiz?.title || "Lesson Quiz"}
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Test your understanding of this lesson by answering each
                question carefully. Complete the quiz to instantly view your
                score and track your progress.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <HelpCircle className="text-orange-500" size={28} />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Total Questions
            </p>

            <h3 className="mt-2 text-4xl font-bold text-orange-500">
              {totalQuestions}
            </h3>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 shadow-sm">
              <Sparkles className="text-orange-500" size={28} />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">Status</p>

            <h3 className="mt-2 text-2xl font-bold text-orange-500">
              Ready to Start
            </h3>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-orange-50/60 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white p-3 shadow-sm">
              <AlertCircle className="text-orange-500" size={24} />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800">
                Before You Begin
              </h4>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>• Read every question carefully before answering.</li>
                <li>• You can move freely between questions.</li>
                <li>• Review your answers before submitting the quiz.</li>
                <li>• Your final score will be shown immediately.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStart}
            disabled={totalQuestions === 0}
            className="flex items-center gap-3 rounded-full bg-orange-400 px-10 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-lg disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300 disabled:shadow-none"
          >
            <Play size={22} />
            {totalQuestions === 0 ? "No Questions Available" : "Start Quiz"}
          </button>
        </div>
      </div>
    </Card>
  );
}
