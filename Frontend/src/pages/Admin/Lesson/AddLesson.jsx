import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { HelpCircle, Plus, Trash2, CheckCircle2 } from "lucide-react";

import LessonForm from "../../../components/admin/lesson/LessonForm";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import { FormSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import {
  AdminFormSection,
  AdminFormField,
} from "../../../components/admin/ui/AdminFormSection";
import {
  fetchAllTopics,
  saveLesson,
  saveQuiz,
} from "../../../api/adminServices";

const createEmptyQuestion = () => ({
  question: "",
  options: ["", "", "", ""],
  correctOption: 0,
  explanation: "",
});

export default function AddLesson() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const topicIdFromUrl = searchParams.get("topicId") || "";

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    topic: topicIdFromUrl,
    title: "",
    description: "",
    order: 1,
    thumbnail: null,
    fileType: "pptx",
    fileName: "",
    fileUrl: "",
    fileDuration: "",
    isPublished: false,
  });

  const [addQuiz, setAddQuiz] = useState(false);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    passingScore: 40,
    durationMinutes: 15,
    isPublished: true,
    questions: [createEmptyQuestion()],
  });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setPageLoading(true);
      const res = await fetchAllTopics();
      setTopics(res.topics || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load topics");
    } finally {
      setPageLoading(false);
    }
  };

  const updateQuizField = (field, value) => {
    setQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const updateQuestion = (qIdx, field, value) => {
    setQuiz((prev) => {
      const questions = [...prev.questions];
      questions[qIdx] = { ...questions[qIdx], [field]: value };
      return { ...prev, questions };
    });
  };

  const updateOption = (qIdx, optIdx, value) => {
    setQuiz((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[qIdx].options];
      options[optIdx] = value;
      questions[qIdx] = { ...questions[qIdx], options };
      return { ...prev, questions };
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
    if (!addQuiz) return true;

    if (!quiz.title.trim()) {
      toast.error("Quiz title is required.");
      return false;
    }

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      if (!q.question.trim()) {
        toast.error(`Question ${i + 1} text is required.`);
        return false;
      }
      if (q.options.some((opt) => !opt.trim())) {
        toast.error(`All 4 options are required for Question ${i + 1}.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (formData) => {
    if (!formData.topic) {
      toast.error("Please select a topic module.");
      return;
    }
    if (!validateQuiz()) return;

    try {
      setLoading(true);

      const data = new FormData();
      data.append("topicId", formData.topic);
      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("order", formData.order);
      data.append("fileType", formData.fileType);
      data.append("fileName", formData.fileName.trim());
      data.append("fileUrl", formData.fileUrl.trim());
      data.append("fileDuration", formData.fileDuration?.trim() || "");
      data.append("isPublished", String(Boolean(formData.isPublished)));

      if (formData.thumbnail instanceof File) {
        data.append("thumbnail", formData.thumbnail);
      }

      const lessonRes = await saveLesson(data);
      const lessonId = lessonRes?._id || lessonRes?.lesson?._id;

      if (addQuiz && lessonId) {
        await saveQuiz({
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
        });
      }

      toast.success(
        addQuiz
          ? "Lesson and quiz created successfully"
          : "Lesson created successfully"
      );

      navigate(
        formData.topic
          ? `/admin/lessons/manage?topicId=${formData.topic}`
          : "/admin/lessons/manage"
      );
    } catch (error) {
      console.error("Create lesson error:", error);
      toast.error(error.response?.data?.message || "Failed to create lesson");
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
        title="Add New Lesson"
        description="Create learning content with presentation slides, video lectures, and assessments."
        breadcrumbs={[
          { label: "Content", path: "/admin/lessons/manage" },
          { label: "Lessons", path: "/admin/lessons/manage" },
          { label: "Add" },
        ]}
        backLink="/admin/lessons/manage"
      />

      <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <LessonForm
          topics={topics}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          loading={loading}
          showTopic={true}
          lockedTopic={Boolean(topicIdFromUrl)}
          onCancel={() => navigate("/admin/lessons/manage")}
          submitLabel={addQuiz ? "Create Lesson & Quiz" : "Create Lesson"}
        />

        {/* Collapsible Quiz Builder */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <HelpCircle size={18} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-text-primary">
                  Attach an Assessment Quiz
                </h3>
                <p className="text-xs text-text-secondary">
                  Optional: Automatically link a quiz to this lesson upon creation.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={addQuiz}
              onClick={() => setAddQuiz((prev) => !prev)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${
                addQuiz ? "bg-primary" : "bg-text-muted/40"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-150 ${
                  addQuiz ? "translate-x-5.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {addQuiz && (
            <div className="mt-6 space-y-6 rounded-xl border border-border bg-background p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <AdminFormField label="Quiz Title" required>
                    <input
                      type="text"
                      value={quiz.title}
                      onChange={(e) => updateQuizField("title", e.target.value)}
                      placeholder="e.g. Action Verbs Review Quiz"
                      maxLength={150}
                      className="h-10 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text-primary outline-none focus:border-primary"
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

              {/* Questions List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-text-secondary">
                    Questions ({quiz.questions.length})
                  </h4>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition"
                  >
                    <Plus size={14} />
                    Add Question
                  </button>
                </div>

                {quiz.questions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="rounded-xl border border-border bg-surface p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-primary">
                        Question #{qIdx + 1}
                      </span>
                      {quiz.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIdx)}
                          className="rounded-lg p-1 text-text-muted hover:text-error hover:bg-error-light transition"
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
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs sm:text-sm text-text-primary outline-none focus:border-primary"
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
                              className="text-primary focus:ring-primary h-3.5 w-3.5"
                            />
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) =>
                                updateOption(qIdx, optIdx, e.target.value)
                              }
                              placeholder={`Option ${optIdx + 1}`}
                              className="flex-1 bg-transparent text-xs text-text-primary outline-none"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
