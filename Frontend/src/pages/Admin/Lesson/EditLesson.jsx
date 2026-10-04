import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { HelpCircle, Plus, Trash2 } from "lucide-react";

import LessonForm from "../../../components/admin/lesson/LessonForm";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminConfirmDialog from "../../../components/admin/ui/AdminConfirmDialog";
import { FormSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import {
  AdminFormSection,
  AdminFormField,
} from "../../../components/admin/ui/AdminFormSection";
import {
  fetchLessonDetails,
  fetchAllTopics,
  fetchAllQuizzes,
  saveLesson,
  saveQuiz,
  removeQuiz,
} from "../../../api/adminServices";

const createEmptyQuestion = () => ({
  question: "",
  options: ["", "", "", ""],
  correctOption: 0,
  explanation: "",
});

export default function EditLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [existingQuiz, setExistingQuiz] = useState(null);
  const [quizEnabled, setQuizEnabled] = useState(false);

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    passingScore: 40,
    durationMinutes: 15,
    isPublished: true,
    questions: [createEmptyQuestion()],
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [deleteQuizConfirm, setDeleteQuizConfirm] = useState(false);

  useEffect(() => {
    loadData();
  }, [lessonId]);

  const loadData = async () => {
    try {
      setPageLoading(true);

      const [lesson, topicsRes, quizzes] = await Promise.all([
        fetchLessonDetails(lessonId),
        fetchAllTopics(),
        fetchAllQuizzes().catch(() => []),
      ]);

      if (!lesson) {
        throw new Error("Lesson not found");
      }

      setTopics(topicsRes?.topics || []);

      setInitialData({
        topic: lesson.topic?._id || lesson.topic || "",
        title: lesson.title || "",
        description: lesson.description || "",
        order: lesson.order || 1,
        isPublished: Boolean(lesson.isPublished),

        // Keep the existing Cloudinary URL for preview.
        // LessonForm will replace this with a File only when
        // the user selects a new thumbnail.
        thumbnail: lesson.thumbnail?.url || null,

        fileType: lesson.file?.type || "pptx",
        fileName: lesson.file?.name || "",
        fileUrl: lesson.file?.url || "",
        fileDuration: lesson.file?.duration || "",
      });

      const lessonQuiz = quizzes.find((q) => {
        const qLessonId = q.lesson?._id || q.lesson;

        return qLessonId?.toString() === lessonId.toString();
      });

      if (lessonQuiz) {
        setExistingQuiz(lessonQuiz);
        setQuizEnabled(true);

        setQuiz({
          title: lessonQuiz.title || "",
          description: lessonQuiz.description || "",
          passingScore: lessonQuiz.passingScore ?? 40,
          durationMinutes: lessonQuiz.durationMinutes ?? 15,
          isPublished: Boolean(lessonQuiz.isPublished),
          questions: lessonQuiz.questions?.length
            ? lessonQuiz.questions.map((q) => ({
                question: q.question || "",
                options: q.options?.length === 4 ? q.options : ["", "", "", ""],
                correctOption: Number.isNaN(Number(q.correctOption))
                  ? 0
                  : Number(q.correctOption),
                explanation: q.explanation || "",
              }))
            : [createEmptyQuestion()],
        });
      } else {
        setExistingQuiz(null);
        setQuizEnabled(false);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load lesson",
      );

      navigate("/admin/lessons/manage", {
        replace: true,
      });
    } finally {
      setPageLoading(false);
    }
  };

  const updateQuizField = (field, value) => {
    setQuiz((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateQuestion = (qIdx, field, value) => {
    setQuiz((prev) => {
      const questions = [...prev.questions];

      questions[qIdx] = {
        ...questions[qIdx],
        [field]: value,
      };

      return {
        ...prev,
        questions,
      };
    });
  };

  const updateOption = (qIdx, optIdx, value) => {
    setQuiz((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[qIdx].options];

      options[optIdx] = value;

      questions[qIdx] = {
        ...questions[qIdx],
        options,
      };

      return {
        ...prev,
        questions,
      };
    });
  };

  const addQuestion = () => {
    if (quiz.questions.length >= 50) {
      toast.error("Maximum 50 questions allowed per quiz.");
      return;
    }

    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, createEmptyQuestion()],
    }));
  };

  const removeQuestion = (qIdx) => {
    if (quiz.questions.length === 1) {
      toast.error("A quiz must have at least one question.");
      return;
    }

    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qIdx),
    }));
  };

  const validateQuiz = () => {
    if (!quizEnabled) {
      return true;
    }

    if (!quiz.title.trim()) {
      toast.error("Quiz title is required.");
      return false;
    }

    if (quiz.questions.length === 0) {
      toast.error("A quiz must have at least one question.");
      return false;
    }

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];

      if (!q.question.trim()) {
        toast.error(`Question ${i + 1} text is required.`);
        return false;
      }

      if (q.options.length !== 4 || q.options.some((opt) => !opt.trim())) {
        toast.error(`All 4 options are required for Question ${i + 1}.`);
        return false;
      }

      const correctOption = Number(q.correctOption);

      if (
        !Number.isInteger(correctOption) ||
        correctOption < 0 ||
        correctOption > 3
      ) {
        toast.error(`Select a correct option for Question ${i + 1}.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (form) => {
    if (!validateQuiz()) {
      return;
    }

    try {
      setLoading(true);

      /*
       * ============================
       * LESSON
       * ============================
       *
       * Keep the existing thumbnail URL
       * when no new file is selected.
       *
       * Only append "thumbnail" when the
       * user selected a new File.
       */
      const data = new FormData();

      data.append("topicId", form.topic || "");
      data.append("title", form.title?.trim() || "");
      data.append("description", form.description?.trim() || "");
      data.append("order", String(form.order || ""));
      data.append("isPublished", String(Boolean(form.isPublished)));

      data.append("fileType", form.fileType || "pptx");
      data.append("fileName", form.fileName?.trim() || "");
      data.append("fileUrl", form.fileUrl?.trim() || "");
      data.append("fileDuration", form.fileDuration?.trim() || "");

      if (form.thumbnail instanceof File) {
        data.append("thumbnail", form.thumbnail);
      }

      await saveLesson(data, lessonId);

      /*
       * ============================
       * QUIZ
       * ============================
       */
      if (quizEnabled) {
        const quizPayload = {
          lessonId,
          title: quiz.title.trim(),
          description: quiz.description.trim(),
          passingScore: Number(quiz.passingScore),
          durationMinutes: Number(quiz.durationMinutes),
          isPublished: Boolean(quiz.isPublished),
          questions: quiz.questions.map((q) => ({
            question: q.question.trim(),
            options: q.options.map((opt) => opt.trim()),
            correctOption: Number(q.correctOption),
            explanation: q.explanation?.trim() || "",
          })),
        };

        if (existingQuiz?._id) {
          await saveQuiz(quizPayload, existingQuiz._id);
        } else {
          await saveQuiz(quizPayload);
        }
      }

      toast.success(
        quizEnabled
          ? "Lesson and quiz updated successfully."
          : "Lesson updated successfully.",
      );

      /*
       * Redirect only after every update succeeds.
       */
      navigate("/admin/lessons/manage", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update lesson",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteDeleteQuiz = async () => {
    if (!existingQuiz?._id) {
      setQuizEnabled(false);
      setDeleteQuizConfirm(false);
      return;
    }

    try {
      setLoading(true);

      await removeQuiz(existingQuiz._id);

      setExistingQuiz(null);
      setQuizEnabled(false);
      setDeleteQuizConfirm(false);

      toast.success("Quiz detached and deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to delete quiz");
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
        title={`Edit Lesson: ${initialData?.title || ""}`}
        description="Update lesson properties, media files, and linked quiz questions."
        breadcrumbs={[
          {
            label: "Content",
            path: "/admin/lessons/manage",
          },
          {
            label: "Lessons",
            path: "/admin/lessons/manage",
          },
          {
            label: "Edit",
          },
        ]}
        backLink="/admin/lessons/manage"
      />

      <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-8">
        {initialData && (
          <LessonForm
            topics={topics}
            form={initialData}
            setForm={setInitialData}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/admin/lessons/manage")}
            submitLabel="Save Changes"
          />
        )}

        {/* ============================
            LINKED QUIZ
        ============================ */}
        <AdminFormSection
          title="Linked Assessment Quiz"
          description={
            existingQuiz
              ? "Modify quiz questions linked to this lesson."
              : "Attach an assessment quiz to test comprehension."
          }
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <HelpCircle size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-text-secondary">
                  {existingQuiz ? "Quiz attached" : "No quiz attached"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {existingQuiz && quizEnabled && (
                <button
                  type="button"
                  onClick={() => setDeleteQuizConfirm(true)}
                  disabled={loading}
                  className="rounded-xl border border-error/20 bg-error-light px-3 py-1.5 text-xs font-semibold text-error transition hover:bg-error-light/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Detach Quiz
                </button>
              )}

              <button
                type="button"
                role="switch"
                aria-checked={quizEnabled}
                onClick={() => setQuizEnabled((prev) => !prev)}
                disabled={loading}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${
                  quizEnabled ? "bg-primary" : "bg-text-muted/40"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-150 ${
                    quizEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {quizEnabled && (
            <div className="mt-6 space-y-6 rounded-xl border border-border bg-background p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <AdminFormField label="Quiz Title" required>
                    <input
                      type="text"
                      value={quiz.title}
                      onChange={(e) => updateQuizField("title", e.target.value)}
                      placeholder="e.g. Chapter Quiz"
                      maxLength={150}
                      className="h-10 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </AdminFormField>
                </div>

                <div className="sm:col-span-2">
                  <AdminFormField label="Description">
                    <textarea
                      value={quiz.description}
                      onChange={(e) =>
                        updateQuizField("description", e.target.value)
                      }
                      rows={3}
                      maxLength={1000}
                      placeholder="Describe what this quiz evaluates..."
                      className="w-full resize-none rounded-xl border border-border bg-surface p-3.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </AdminFormField>
                </div>

                <AdminFormField label="Passing Score (%)">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={quiz.passingScore}
                    onChange={(e) =>
                      updateQuizField("passingScore", e.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text-primary outline-none focus:border-primary"
                  />
                </AdminFormField>

                <AdminFormField label="Duration (Minutes)">
                  <input
                    type="number"
                    min={1}
                    max={180}
                    value={quiz.durationMinutes}
                    onChange={(e) =>
                      updateQuizField("durationMinutes", e.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text-primary outline-none focus:border-primary"
                  />
                </AdminFormField>
              </div>

              {/* ============================
                  QUESTIONS
              ============================ */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Questions ({quiz.questions.length})
                  </h4>

                  <button
                    type="button"
                    onClick={addQuestion}
                    disabled={loading}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary transition hover:text-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={14} />
                    Add Question
                  </button>
                </div>

                {quiz.questions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="space-y-3 rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-primary">
                        Question #{qIdx + 1}
                      </span>

                      {quiz.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIdx)}
                          disabled={loading}
                          className="rounded-lg p-1 text-text-muted transition hover:bg-error-light hover:text-error disabled:cursor-not-allowed disabled:opacity-50"
                          title="Remove question"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) =>
                        updateQuestion(qIdx, "question", e.target.value)
                      }
                      placeholder="Enter question text..."
                      maxLength={500}
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-text-primary outline-none focus:border-primary sm:text-sm"
                    />

                    <div className="grid gap-2 sm:grid-cols-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = Number(q.correctOption) === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition ${
                              isCorrect
                                ? "border-primary bg-primary-light/30"
                                : "border-border bg-background"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`correct-opt-${qIdx}`}
                              checked={isCorrect}
                              onChange={() =>
                                updateQuestion(qIdx, "correctOption", optIdx)
                              }
                              disabled={loading}
                              className="h-3.5 w-3.5 text-primary focus:ring-primary"
                            />

                            <input
                              type="text"
                              value={opt}
                              onChange={(e) =>
                                updateOption(qIdx, optIdx, e.target.value)
                              }
                              placeholder={`Option ${optIdx + 1}`}
                              maxLength={250}
                              disabled={loading}
                              className="flex-1 bg-transparent text-xs text-text-primary outline-none disabled:cursor-not-allowed disabled:opacity-60"
                            />
                          </div>
                        );
                      })}
                    </div>

                    <textarea
                      value={q.explanation || ""}
                      onChange={(e) =>
                        updateQuestion(qIdx, "explanation", e.target.value)
                      }
                      rows={2}
                      maxLength={500}
                      placeholder="Optional explanation for the correct answer..."
                      className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-xs text-text-primary outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </AdminFormSection>
      </div>

      {/* ============================
          DELETE QUIZ DIALOG
      ============================ */}
      <AdminConfirmDialog
        isOpen={deleteQuizConfirm}
        onClose={() => setDeleteQuizConfirm(false)}
        onConfirm={handleExecuteDeleteQuiz}
        loading={loading}
        title="Detach and Delete Quiz?"
        description="This will permanently delete the assessment quiz attached to this lesson and all its questions."
        confirmLabel="Delete Quiz"
      />
    </div>
  );
}
