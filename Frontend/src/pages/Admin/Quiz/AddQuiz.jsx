import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Trash2, HelpCircle } from "lucide-react";

import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import { FormSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import {
  AdminFormSection,
  AdminFormField,
  AdminFormActions,
} from "../../../components/admin/ui/AdminFormSection";
import PublishToggle from "../../../components/admin/topic/PublishToggle";
import {
  fetchAllLessons,
  fetchAllQuizzes,
  saveQuiz,
} from "../../../api/adminServices";

const createEmptyQuestion = () => ({
  question: "",
  options: ["", "", "", ""],
  correctOption: 0,
  explanation: "",
});

export default function AddQuiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlLessonId = searchParams.get("lessonId") || "";

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    lessonId: urlLessonId,
    title: "",
    description: "",
    passingScore: 40,
    durationMinutes: 15,
    isPublished: true,
  });

  const [questions, setQuestions] = useState([createEmptyQuestion()]);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setPageLoading(true);
      const [allLessons, allQuizzes] = await Promise.all([
        fetchAllLessons(),
        fetchAllQuizzes(),
      ]);

      const existingQuizLessonIds = new Set(
        allQuizzes.map((q) => (q.lesson?._id || q.lesson)?.toString())
      );

      // Show lessons that don't have a quiz yet, plus the selected one if urlLessonId
      const available = (allLessons || []).filter(
        (l) =>
          !existingQuizLessonIds.has(l._id.toString()) ||
          l._id.toString() === urlLessonId.toString()
      );

      setLessons(available);

      if (urlLessonId) {
        const found = allLessons.find(
          (l) => l._id.toString() === urlLessonId.toString()
        );
        if (found) {
          setForm((prev) => ({
            ...prev,
            title: `${found.title} - Assessment Quiz`,
          }));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load lessons");
    } finally {
      setPageLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateQuestion = (qIdx, field, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx] = { ...copy[qIdx], [field]: value };
      return copy;
    });
  };

  const updateOption = (qIdx, optIdx, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      const opts = [...copy[qIdx].options];
      opts[optIdx] = value;
      copy[qIdx] = { ...copy[qIdx], options: opts };
      return copy;
    });
  };

  const addQuestion = () => {
    if (questions.length >= 50) {
      toast.error("Maximum 50 questions allowed per quiz.");
      return;
    }
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const removeQuestion = (qIdx) => {
    if (questions.length === 1) {
      toast.error("Quiz must have at least one question.");
      return;
    }
    setQuestions((prev) => prev.filter((_, i) => i !== qIdx));
  };

  const validate = () => {
    if (!form.lessonId) {
      toast.error("Please select a lesson for this quiz.");
      return false;
    }
    if (!form.title.trim()) {
      toast.error("Quiz title is required.");
      return false;
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        toast.error(`Question ${i + 1} text is required.`);
        return false;
      }
      if (q.options.some((opt) => !opt.trim())) {
        toast.error(`All four options are required for Question ${i + 1}.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await saveQuiz({
        lessonId: form.lessonId,
        title: form.title.trim(),
        description: form.description.trim(),
        passingScore: Number(form.passingScore),
        durationMinutes: Number(form.durationMinutes),
        isPublished: Boolean(form.isPublished),
        questions: questions.map((q) => ({
          question: q.question.trim(),
          options: q.options.map((opt) => opt.trim()),
          correctOption: Number(q.correctOption),
          explanation: q.explanation?.trim() || "",
        })),
      });

      toast.success("Quiz created successfully");
      navigate("/admin/quizzes/manage");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <AdminPageHeader
        title="Create New Quiz"
        description="Build a modular assessment quiz with multiple-choice questions for students."
        breadcrumbs={[
          { label: "Content", path: "/admin/quizzes/manage" },
          { label: "Quizzes", path: "/admin/quizzes/manage" },
          { label: "Add" },
        ]}
        backLink="/admin/quizzes/manage"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs"
      >
        {/* Basic Details */}
        <AdminFormSection
          title="Quiz Information"
          description="Link this assessment to a lesson and set scoring criteria."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <AdminFormField label="Target Lesson" required>
                <select
                  value={form.lessonId}
                  onChange={(e) => handleFieldChange("lessonId", e.target.value)}
                  required
                  className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary outline-none focus:border-primary"
                >
                  <option value="">Select a lesson...</option>
                  {lessons.map((l) => (
                    <option key={l._id} value={l._id}>
                      {l.title} (Topic: {l.topic?.title || "N/A"})
                    </option>
                  ))}
                </select>
              </AdminFormField>
            </div>

            <div className="sm:col-span-2">
              <AdminFormField label="Quiz Title" required>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  placeholder="e.g. Vocabulary Chapter 1 Review"
                  required
                  maxLength={150}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary outline-none focus:border-primary"
                />
              </AdminFormField>
            </div>

            <div className="sm:col-span-2">
              <AdminFormField label="Description">
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  placeholder="Outline the scope and expectations for this quiz..."
                  maxLength={500}
                  className="w-full resize-none rounded-xl border border-border bg-background p-3.5 text-sm text-text-primary outline-none focus:border-primary"
                />
              </AdminFormField>
            </div>

            <AdminFormField label="Passing Score (%)" required>
              <input
                type="number"
                min={0}
                max={100}
                value={form.passingScore}
                onChange={(e) =>
                  handleFieldChange("passingScore", e.target.value)
                }
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary outline-none focus:border-primary"
              />
            </AdminFormField>

            <AdminFormField label="Duration (Minutes)" required>
              <input
                type="number"
                min={1}
                max={180}
                value={form.durationMinutes}
                onChange={(e) =>
                  handleFieldChange("durationMinutes", e.target.value)
                }
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary outline-none focus:border-primary"
              />
            </AdminFormField>
          </div>
        </AdminFormSection>

        {/* Questions Builder */}
        <AdminFormSection
          title="Question Bank"
          description="Add multiple-choice questions with 4 options and mark the correct option."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Questions ({questions.length})
              </span>
              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition"
              >
                <Plus size={15} />
                <span>Add Question</span>
              </button>
            </div>

            {questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="rounded-xl border border-border bg-background p-4 sm:p-5 space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary">
                    Question #{qIdx + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIdx)}
                      className="rounded-lg p-1 text-text-muted hover:text-error hover:bg-error-light transition"
                      title="Remove question"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(qIdx, "question", e.target.value)
                  }
                  required
                  placeholder="Enter the question prompt..."
                  className="h-10 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text-primary outline-none focus:border-primary"
                />

                {/* 4 options with radio */}
                <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = Number(q.correctOption) === optIdx;

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 transition ${
                          isCorrect
                            ? "border-primary bg-primary-light/40 ring-1 ring-primary"
                            : "border-border bg-surface"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`quiz-correct-${qIdx}`}
                          checked={isCorrect}
                          onChange={() =>
                            updateQuestion(qIdx, "correctOption", optIdx)
                          }
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            updateOption(qIdx, optIdx, e.target.value)
                          }
                          required
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          className="min-w-0 flex-1 bg-transparent text-xs sm:text-sm text-text-primary outline-none"
                        />
                      </div>
                    );
                  })}
                </div>

                <input
                  type="text"
                  value={q.explanation}
                  onChange={(e) =>
                    updateQuestion(qIdx, "explanation", e.target.value)
                  }
                  placeholder="Explanation shown after quiz submission (optional)..."
                  className="h-9 w-full rounded-lg border border-border bg-surface px-3 text-xs text-text-secondary outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
        </AdminFormSection>

        {/* Publishing Status */}
        <AdminFormSection
          title="Visibility"
          description="Control whether students can currently take this quiz."
        >
          <div className="rounded-xl border border-border bg-background p-4">
            <PublishToggle
              checked={form.isPublished}
              onChange={(e) =>
                handleFieldChange("isPublished", e.target.checked)
              }
              title="Publish Quiz"
              description="Make this assessment active and available to students after completing the lesson."
            />
          </div>
        </AdminFormSection>

        <AdminFormActions
          onCancel={() => navigate("/admin/quizzes/manage")}
          loading={loading}
          submitLabel="Create Quiz"
        />
      </form>
    </div>
  );
}
