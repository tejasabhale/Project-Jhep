import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";

import {
  fetchAllQuizzes,
  removeQuiz,
  saveQuiz,
} from "../../../api/adminServices";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminToolbar from "../../../components/admin/ui/AdminToolbar";
import AdminStatusBadge from "../../../components/admin/ui/AdminStatusBadge";
import AdminConfirmDialog from "../../../components/admin/ui/AdminConfirmDialog";
import AdminEmptyState from "../../../components/admin/ui/AdminEmptyState";
import { TableSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import QuizPreviewModal from "../../../components/admin/quiz/QuizPreviewModal";
import {
  AdminTableWrapper,
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
} from "../../../components/admin/ui/AdminTable";

export default function ManageQuizzes() {
  const [searchParams] = useSearchParams();
  const urlLessonId = searchParams.get("lessonId") || "";

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchAllQuizzes();
      setQuizzes(data || []);
    } catch (error) {
      console.error("Error loading quizzes:", error);
      toast.error(error.response?.data?.message || "Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Quick toggle status
  const handleTogglePublish = async (quiz) => {
    try {
      const updatedStatus = !quiz.isPublished;
      await saveQuiz({ isPublished: updatedStatus }, quiz._id);

      setQuizzes((prev) =>
        prev.map((q) =>
          q._id === quiz._id ? { ...q, isPublished: updatedStatus } : q
        )
      );

      toast.success(
        updatedStatus ? "Quiz published successfully" : "Quiz set to draft"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  // Delete execution
  const confirmDelete = async () => {
    if (!quizToDelete) return;

    try {
      setDeleteLoading(true);
      await removeQuiz(quizToDelete._id);
      toast.success("Quiz deleted successfully");
      setQuizzes((prev) => prev.filter((q) => q._id !== quizToDelete._id));
      setQuizToDelete(null);
    } catch (error) {
      console.error("Delete quiz error:", error);
      toast.error(error.response?.data?.message || "Failed to delete quiz");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter logic
  const filteredQuizzes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return quizzes.filter((quiz) => {
      const quizLessonId = quiz.lesson?._id || quiz.lesson;
      const lessonTitle = quiz.lesson?.title || "";

      const matchesSearch =
        !query ||
        quiz.title?.toLowerCase().includes(query) ||
        lessonTitle.toLowerCase().includes(query) ||
        quiz.description?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && quiz.isPublished) ||
        (statusFilter === "unpublished" && !quiz.isPublished);

      const matchesLesson =
        !urlLessonId ||
        quizLessonId?.toString() === urlLessonId.toString();

      return matchesSearch && matchesStatus && matchesLesson;
    });
  }, [quizzes, search, statusFilter, urlLessonId]);

  const hasFilters = Boolean(search.trim() || statusFilter !== "all" || urlLessonId);

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        title="Quizzes"
        description="Create and manage assessments, question sets, passing requirements, and publishing status."
        breadcrumbs={[
          { label: "Content" },
          { label: "Quizzes" },
        ]}
        actions={
          <Link
            to="/admin/quizzes/add"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-dark transition"
          >
            <Plus size={16} />
            <span>Create Quiz</span>
          </Link>
        }
      />

      {/* Toolbar */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search quizzes by title or lesson name..."
        totalItems={quizzes.length}
        showingItems={filteredQuizzes.length}
        hasActiveFilters={hasFilters}
        onClearFilters={handleClearFilters}
        filters={[
          {
            id: "status",
            label: "Publication Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Statuses", value: "all" },
              { label: "Published Only", value: "published" },
              { label: "Unpublished Only", value: "unpublished" },
            ],
          },
        ]}
      />

      {/* Main Content Area */}
      {loading ? (
        <TableSkeleton rows={5} />
      ) : quizzes.length === 0 ? (
        <AdminEmptyState
          title="No quizzes created yet"
          description="Create your first lesson assessment to evaluate student comprehension."
          icon={HelpCircle}
          actionLabel="Create Quiz"
          actionLink="/admin/quizzes/add"
        />
      ) : filteredQuizzes.length === 0 ? (
        <AdminEmptyState
          isFiltered={true}
          onClearFilters={handleClearFilters}
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <AdminTableWrapper>
              <AdminTable>
                <AdminTableHeader>
                  <tr>
                    <AdminTableCell isHeader className="w-[32%]">
                      Quiz Assessment
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[24%]">
                      Linked Lesson
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[12%]">
                      Questions
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[14%]">
                      Pass / Duration
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[10%]">
                      Status
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[8%] text-right">
                      Actions
                    </AdminTableCell>
                  </tr>
                </AdminTableHeader>

                <AdminTableBody>
                  {filteredQuizzes.map((quiz) => (
                    <AdminTableRow key={quiz._id}>
                      {/* Quiz info */}
                      <AdminTableCell>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                            <HelpCircle size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-text-primary truncate">
                              {quiz.title}
                            </p>
                            <p className="mt-0.5 text-xs text-text-muted line-clamp-1">
                              {quiz.description || "No description provided."}
                            </p>
                          </div>
                        </div>
                      </AdminTableCell>

                      {/* Lesson info */}
                      <AdminTableCell>
                        {quiz.lesson ? (
                          <div className="min-w-0">
                            <Link
                              to={`/admin/lessons/edit/${quiz.lesson._id}`}
                              className="font-medium text-text-secondary hover:text-primary transition truncate block"
                            >
                              {quiz.lesson.title || "Lesson"}
                            </Link>
                            <span className="text-[11px] text-text-muted">
                              Order #{quiz.lesson.order ?? 1}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-text-muted italic">
                            Unassigned
                          </span>
                        )}
                      </AdminTableCell>

                      {/* Questions count */}
                      <AdminTableCell>
                        <button
                          type="button"
                          onClick={() => setPreviewQuiz(quiz)}
                          className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 hover:bg-purple-100 transition"
                          title="Click to preview questions"
                        >
                          <span>{quiz.questions?.length || 0} Questions</span>
                        </button>
                      </AdminTableCell>

                      {/* Pass / Duration */}
                      <AdminTableCell>
                        <div className="text-xs text-text-secondary">
                          <p className="font-semibold text-text-primary">
                            {quiz.passingScore ?? 40}% pass
                          </p>
                          <p className="text-[11px] text-text-muted">
                            {quiz.durationMinutes ?? 15} mins duration
                          </p>
                        </div>
                      </AdminTableCell>

                      {/* Status */}
                      <AdminTableCell>
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(quiz)}
                          title="Click to toggle status"
                        >
                          <AdminStatusBadge
                            status={quiz.isPublished ? "published" : "unpublished"}
                            size="xs"
                          />
                        </button>
                      </AdminTableCell>

                      {/* Actions */}
                      <AdminTableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewQuiz(quiz)}
                            className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:border-primary-light hover:bg-surface-muted hover:text-primary transition"
                            title="Preview questions"
                          >
                            <Eye size={14} />
                          </button>

                          <Link
                            to={`/admin/quizzes/edit/${quiz._id}`}
                            className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
                            title="Edit quiz"
                          >
                            <Edit size={14} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setQuizToDelete(quiz)}
                            className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:bg-error-light hover:text-error transition"
                            title="Delete quiz"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </AdminTableCell>
                    </AdminTableRow>
                  ))}
                </AdminTableBody>
              </AdminTable>
            </AdminTableWrapper>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="space-y-3 lg:hidden">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="rounded-2xl border border-border bg-surface p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                    <HelpCircle size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-text-primary truncate text-sm">
                        {quiz.title}
                      </h4>
                      <AdminStatusBadge
                        status={quiz.isPublished ? "published" : "unpublished"}
                        size="xs"
                      />
                    </div>

                    <p className="mt-1 text-xs text-text-muted truncate">
                      Lesson:{" "}
                      <span className="font-medium text-text-secondary">
                        {quiz.lesson?.title || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-text-secondary">
                  <span>
                    Questions:{" "}
                    <strong>{quiz.questions?.length || 0}</strong>
                  </span>
                  <span>
                    Passing: <strong>{quiz.passingScore ?? 40}%</strong>
                  </span>
                  <span>
                    Duration: <strong>{quiz.durationMinutes ?? 15}m</strong>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-border pt-2.5">
                  <button
                    type="button"
                    onClick={() => setPreviewQuiz(quiz)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-purple-50 px-2.5 py-2 text-xs font-semibold text-purple-700"
                  >
                    <Eye size={13} />
                    Preview
                  </button>

                  <Link
                    to={`/admin/quizzes/edit/${quiz._id}`}
                    className="flex items-center justify-center gap-1 rounded-xl border border-border bg-surface px-2.5 py-2 text-xs font-semibold text-text-secondary"
                  >
                    <Edit size={13} />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => setQuizToDelete(quiz)}
                    className="flex items-center justify-center gap-1 rounded-xl border border-error/20 bg-error-light px-2.5 py-2 text-xs font-semibold text-error"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Preview Modal */}
      <QuizPreviewModal
        isOpen={Boolean(previewQuiz)}
        onClose={() => setPreviewQuiz(null)}
        quiz={previewQuiz}
      />

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={Boolean(quizToDelete)}
        onClose={() => setQuizToDelete(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title={`Delete Quiz "${quizToDelete?.title}"?`}
        description="This will permanently delete this assessment quiz and its entire question bank."
        confirmLabel="Delete Quiz"
      />
    </div>
  );
}
