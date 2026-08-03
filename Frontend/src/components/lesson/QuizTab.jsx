import {
  ClipboardCheck,
  Clock,
  HelpCircle,
  Trophy,
  Play,
  AlertCircle,
} from "lucide-react";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

export default function QuizTab({ lesson, quiz, onStart }) {
  if (!quiz) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        message="No quiz has been added for this lesson yet."
      />
    );
  }

  const questions = quiz?.metadata?.questions || [];
  const totalQuestions = questions.length;
  const passingMarks =
    quiz?.metadata?.passingMarks ?? Math.ceil(totalQuestions * 0.6);
  const timeLimit = quiz?.metadata?.timeLimit ?? Math.max(5, totalQuestions);

  return (
    <Card>
      <div className="space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <ClipboardCheck className="text-orange-500" size={40} />
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            {quiz?.metadata?.title || "Lesson Quiz"}
          </h2>
          <p className="mt-3 text-slate-600">
            Test what you've learned before moving to the next lesson.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:max-w-[400px] md:mx-auto">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 text-center">
            <HelpCircle className="mx-auto text-orange-500" size={30} />
            <p className="mt-2 text-sm text-slate-500">Questions</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {totalQuestions}
            </h3>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 text-center">
            <Trophy className="mx-auto text-orange-500" size={30} />
            <p className="mt-2 text-sm text-slate-500">Passing Score</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {passingMarks}/{totalQuestions}
            </h3>
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 text-yellow-600" size={22} />
            <div>
              <h4 className="font-semibold text-slate-800">Instructions</h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Read every question carefully.</li>
                <li>Select the best answer.</li>
                <li>You can move between questions.</li>
                <li>Submit the quiz after answering.</li>
                <li>Your score will be shown immediately.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStart}
            className="flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-orange-600"
          >
            <Play size={22} />
            Start Quiz
          </button>
        </div>
      </div>
    </Card>
  );
}
