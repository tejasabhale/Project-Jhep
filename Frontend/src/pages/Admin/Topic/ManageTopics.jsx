import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ListPlus,
  Layers,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

import {
  fetchAllTopics,
  removeTopic,
  fetchAllLessons,
} from "../../../api/adminServices";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminToolbar from "../../../components/admin/ui/AdminToolbar";
import AdminStatusBadge from "../../../components/admin/ui/AdminStatusBadge";
import AdminConfirmDialog from "../../../components/admin/ui/AdminConfirmDialog";
import AdminEmptyState from "../../../components/admin/ui/AdminEmptyState";
import { TableSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import {
  AdminTableWrapper,
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
} from "../../../components/admin/ui/AdminTable";

export default function ManageTopics() {
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Delete modal state
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [topicsRes, lessonsRes] = await Promise.all([
        fetchAllTopics(),
        fetchAllLessons().catch(() => []),
      ]);
      setTopics(topicsRes.topics || []);
      setLessons(lessonsRes || []);
    } catch (error) {
      console.error("Error loading topics:", error);
      toast.error(error.response?.data?.message || "Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute lesson count map per topic
  const lessonCountMap = useMemo(() => {
    const map = new Map();
    lessons.forEach((l) => {
      const tId = l.topic?._id || l.topic;
      if (tId) {
        map.set(tId.toString(), (map.get(tId.toString()) || 0) + 1);
      }
    });
    return map;
  }, [lessons]);

  // Filtering
  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();
    return topics.filter((topic) => {
      const matchesSearch =
        !query ||
        topic.title?.toLowerCase().includes(query) ||
        topic.description?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && topic.isPublished) ||
        (statusFilter === "unpublished" && !topic.isPublished);

      return matchesSearch && matchesStatus;
    });
  }, [topics, search, statusFilter]);

  const hasFilters = Boolean(search.trim() || statusFilter !== "all");

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  // Delete execution
  const confirmDelete = async () => {
    if (!topicToDelete) return;
    try {
      setDeleteLoading(true);
      await removeTopic(topicToDelete._id);
      toast.success("Topic deleted successfully");
      setTopics((prev) => prev.filter((t) => t._id !== topicToDelete._id));
      setTopicToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message ||
          "Cannot delete topic. Ensure all lessons under this topic are removed first."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        title="Topics"
        description="Create, structure, and manage core learning modules and topics."
        breadcrumbs={[{ label: "Content" }, { label: "Topics" }]}
        actions={
          <Link
            to="/admin/topics/add"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-dark transition"
          >
            <Plus size={16} />
            <span>New Topic</span>
          </Link>
        }
      />

      {/* Toolbar / Search & Filter */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search topics by title or description..."
        totalItems={topics.length}
        showingItems={filteredTopics.length}
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
        extraActions={
          <Link
            to="/admin/lessons/add"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
          >
            <ListPlus size={14} />
            <span>Add Lesson</span>
          </Link>
        }
      />

      {/* Data Table / Empty / Loading */}
      {loading ? (
        <TableSkeleton rows={6} />
      ) : topics.length === 0 ? (
        <AdminEmptyState
          title="No topics created yet"
          description="Create your first learning topic to start building curriculum modules."
          icon={Layers}
          actionLabel="Create Topic"
          actionLink="/admin/topics/add"
        />
      ) : filteredTopics.length === 0 ? (
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
                    <AdminTableCell isHeader className="w-[38%]">
                      Topic Details
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[14%]">
                      Order
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[16%]">
                      Lessons
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[16%]">
                      Status
                    </AdminTableCell>
                    <AdminTableCell isHeader className="w-[16%] text-right">
                      Actions
                    </AdminTableCell>
                  </tr>
                </AdminTableHeader>

                <AdminTableBody>
                  {filteredTopics.map((topic) => {
                    const count = lessonCountMap.get(topic._id) || 0;

                    return (
                      <AdminTableRow key={topic._id}>
                        {/* Topic info */}
                        <AdminTableCell>
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-muted flex items-center justify-center">
                              {topic.thumbnail?.url ? (
                                <img
                                  src={topic.thumbnail.url}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <BookOpen size={18} className="text-primary" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-text-primary truncate">
                                {topic.title}
                              </p>
                              <p className="mt-0.5 text-xs text-text-secondary line-clamp-1">
                                {topic.description || "No description provided."}
                              </p>
                            </div>
                          </div>
                        </AdminTableCell>

                        {/* Order */}
                        <AdminTableCell>
                          <span className="font-mono text-xs font-semibold text-text-secondary">
                            #{topic.order ?? 0}
                          </span>
                        </AdminTableCell>

                        {/* Lessons */}
                        <AdminTableCell>
                          <Link
                            to={`/admin/lessons/manage?topicId=${topic._id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition"
                            title="View all lessons for this topic"
                          >
                            <span>{count} {count === 1 ? "lesson" : "lessons"}</span>
                            <ChevronRight size={13} />
                          </Link>
                        </AdminTableCell>

                        {/* Status */}
                        <AdminTableCell>
                          <AdminStatusBadge
                            status={topic.isPublished ? "published" : "unpublished"}
                          />
                        </AdminTableCell>

                        {/* Actions */}
                        <AdminTableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/admin/lessons/add?topicId=${topic._id}`}
                              className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:border-primary-light hover:bg-surface-muted hover:text-primary transition"
                              title="Add lesson to this topic"
                            >
                              <Plus size={15} />
                            </Link>

                            <Link
                              to={`/admin/topics/edit/${topic._id}`}
                              className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
                              title="Edit topic"
                            >
                              <Edit size={15} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setTopicToDelete(topic)}
                              className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:bg-error-light hover:text-error transition"
                              title="Delete topic"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </AdminTableCell>
                      </AdminTableRow>
                    );
                  })}
                </AdminTableBody>
              </AdminTable>
            </AdminTableWrapper>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="space-y-3 lg:hidden">
            {filteredTopics.map((topic) => {
              const count = lessonCountMap.get(topic._id) || 0;

              return (
                <div
                  key={topic._id}
                  className="rounded-2xl border border-border bg-surface p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-muted flex items-center justify-center">
                      {topic.thumbnail?.url ? (
                        <img
                          src={topic.thumbnail.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <BookOpen size={20} className="text-primary" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-text-primary truncate text-sm">
                          {topic.title}
                        </h4>
                        <AdminStatusBadge
                          status={topic.isPublished ? "published" : "unpublished"}
                          size="xs"
                        />
                      </div>

                      <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                        {topic.description || "No description provided."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-text-secondary">
                    <span>
                      Order: <strong>#{topic.order ?? 0}</strong>
                    </span>

                    <Link
                      to={`/admin/lessons/manage?topicId=${topic._id}`}
                      className="font-semibold text-primary inline-flex items-center gap-1"
                    >
                      {count} lessons
                      <ChevronRight size={13} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-border pt-2.5">
                    <Link
                      to={`/admin/lessons/add?topicId=${topic._id}`}
                      className="flex items-center justify-center gap-1 rounded-xl bg-primary-light px-2.5 py-2 text-xs font-semibold text-primary-dark"
                    >
                      <Plus size={13} />
                      Lesson
                    </Link>

                    <Link
                      to={`/admin/topics/edit/${topic._id}`}
                      className="flex items-center justify-center gap-1 rounded-xl border border-border bg-surface px-2.5 py-2 text-xs font-semibold text-text-secondary"
                    >
                      <Edit size={13} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => setTopicToDelete(topic)}
                      className="flex items-center justify-center gap-1 rounded-xl border border-error/20 bg-error-light px-2.5 py-2 text-xs font-semibold text-error"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={Boolean(topicToDelete)}
        onClose={() => setTopicToDelete(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title={`Delete Topic "${topicToDelete?.title}"?`}
        description="This topic will be permanently removed. You cannot delete a topic that still contains lessons."
        confirmLabel="Delete Topic"
      />
    </div>
  );
}
