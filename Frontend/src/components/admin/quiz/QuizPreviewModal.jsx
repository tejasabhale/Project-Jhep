import React from "react";
import { CheckCircle2, Clock, Award, HelpCircle } from "lucide-react";
import AdminModal from "../ui/AdminModal";
import AdminStatusBadge from "../ui/AdminStatusBadge";

export default function QuizPreviewModal({
  isOpen,
  onClose,
  quiz,
}) {
  if (!quiz) return null;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={quiz.title}
      description={
        quiz.lesson?.title
          ? `Assessment for lesson: "${quiz.lesson.title}"`
          : "Quiz Assessment Preview"
      }
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Metadata summary bar */}
        <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-background p-3.5 text-center text-xs">
          <div>
            <span className="text-text-muted block">Questions</span>
            <span className="font-bold text-text-primary text-sm">
              {quiz.questions?.length || 0}
            </span>
          </div>
          <div>
            <span className="text-text-muted block">Passing Score</span>
            <span className="font-bold text-text-primary text-sm">
              {quiz.passingScore ?? 40}%
            </span>
          </div>
          <div>
            <span className="text-text-muted block">Duration</span>
            <span className="font-bold text-text-primary text-sm">
              {quiz.durationMinutes ?? 15} mins
            </span>
          </div>
        </div>

        {quiz.description && (
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-surface-muted/50 p-3 rounded-xl border border-border/60">
            {quiz.description}
          </p>
        )}

        {/* Questions list */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold text-text-primary flex items-center gap-2">
            <HelpCircle size={16} className="text-primary" />
            <span>Questions & Answer Key</span>
          </h4>

          {quiz.questions?.map((q, idx) => (
            <div
              key={q._id || idx}
              className="rounded-xl border border-border bg-background p-4 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-[10px] font-bold text-primary-dark">
                  {idx + 1}
                </span>
                <p className="font-bold text-xs sm:text-sm text-text-primary">
                  {q.question}
                </p>
              </div>

              {/* 4 options */}
              <div className="grid gap-2 sm:grid-cols-2 pt-1">
                {q.options?.map((opt, optIdx) => {
                  const isCorrect = Number(q.correctOption) === optIdx;

                  return (
                    <div
                      key={optIdx}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                        isCorrect
                          ? "border-success/30 bg-success-light/40 text-success font-semibold"
                          : "border-border bg-surface text-text-secondary"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          isCorrect
                            ? "bg-success text-white"
                            : "bg-surface-muted text-text-muted"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="truncate">{opt}</span>
                      {isCorrect && (
                        <CheckCircle2
                          size={13}
                          className="ml-auto shrink-0 text-success"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <div className="rounded-lg bg-surface p-2.5 text-xs text-text-secondary border border-border/50">
                  <span className="font-semibold text-text-primary">
                    Explanation:{" "}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminModal>
  );
}
