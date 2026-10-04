import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus, MessageSquareQuote, Star } from "lucide-react";

import TestimonialTable from "../../../components/admin/testimonials/TestimonialTable";
import TestimonialModal from "../../../components/admin/testimonials/TestimonialModal";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminToolbar from "../../../components/admin/ui/AdminToolbar";
import AdminConfirmDialog from "../../../components/admin/ui/AdminConfirmDialog";
import AdminEmptyState from "../../../components/admin/ui/AdminEmptyState";
import { TableSkeleton } from "../../../components/admin/ui/AdminSkeleton";

import {
  fetchAllTestimonials,
  saveTestimonial,
  removeTestimonial,
  toggleTestimonialActive,
} from "../../../api/adminServices";

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await fetchAllTestimonials();
      setTestimonials(data || []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      toast.error(error.response?.data?.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filteredTestimonials = useMemo(() => {
    const query = search.toLowerCase().trim();

    return testimonials.filter((t) => {
      const matchesSearch =
        !query ||
        t.name?.toLowerCase().includes(query) ||
        t.review?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && t.isActive === true) ||
        (statusFilter === "inactive" && t.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [testimonials, search, statusFilter]);

  const hasFilters = Boolean(search.trim() || statusFilter !== "all");

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedTestimonial(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      setActionLoading(true);

      if (selectedTestimonial) {
        await saveTestimonial(data, selectedTestimonial._id);
        toast.success("Testimonial updated successfully");
      } else {
        await saveTestimonial(data);
        toast.success("Testimonial created successfully");
      }

      setIsModalOpen(false);
      setSelectedTestimonial(null);
      await fetchTestimonials();
    } catch (error) {
      console.error("Failed to save testimonial:", error);
      toast.error(error.response?.data?.message || "Failed to save testimonial");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeleteLoading(true);
      await removeTestimonial(itemToDelete._id);
      toast.success("Testimonial deleted successfully");
      setTestimonials((prev) => prev.filter((t) => t._id !== itemToDelete._id));
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      toast.error(error.response?.data?.message || "Failed to delete testimonial");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await toggleTestimonialActive(item._id);
      setTestimonials((prev) =>
        prev.map((t) =>
          t._id === item._id ? { ...t, isActive: !t.isActive } : t
        )
      );
      toast.success(
        item.isActive ? "Testimonial deactivated" : "Testimonial approved & active"
      );
    } catch (error) {
      console.error("Failed to toggle status:", error);
      toast.error("Failed to update status");
    }
  };

  const activeCount = testimonials.filter((t) => t.isActive).length;
  const inactiveCount = testimonials.length - activeCount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        title="Testimonials"
        subtitle="Review, moderate, and publish student and teacher quotes featured on the public website."
        badge={`${testimonials.length} ${testimonials.length === 1 ? "review" : "reviews"}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Testimonials" },
        ]}
        actions={
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 active:opacity-90"
          >
            <Plus size={15} />
            <span>Add Testimonial</span>
          </button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Total Reviews
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <MessageSquareQuote size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {testimonials.length}
          </div>
          <p className="mt-1 text-xs text-text-muted">Collected feedback quotes</p>
        </div>

        <div className="rounded-xl border border-success/20 bg-success/5 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-success">
              Approved & Active
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success">
              <Star size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-success">
            {activeCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Visible on public testimonials</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Inactive / Draft
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-text-muted">
              <MessageSquareQuote size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {inactiveCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Hidden from public view</p>
        </div>
      </div>

      {/* Toolbar */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search reviews by student name or quote text..."
        totalItems={testimonials.length}
        showingItems={filteredTestimonials.length}
        hasActiveFilters={hasFilters}
        onClearFilters={handleClearFilters}
        filters={[
          {
            id: "status",
            label: "Status Filter",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Reviews", value: "all" },
              { label: "Active Only", value: "active" },
              { label: "Inactive Only", value: "inactive" },
            ],
          },
        ]}
      />

      {/* Main Table / Empty State */}
      {loading ? (
        <TableSkeleton rows={5} />
      ) : testimonials.length === 0 ? (
        <AdminEmptyState
          title="No testimonials yet"
          description="Collect and publish authentic learning stories and community feedback."
          icon={MessageSquareQuote}
          actionLabel="Add Testimonial"
          onAction={handleAdd}
        />
      ) : filteredTestimonials.length === 0 ? (
        <AdminEmptyState
          isFiltered={true}
          onClearFilters={handleClearFilters}
        />
      ) : (
        <TestimonialTable
          testimonials={filteredTestimonials}
          onEdit={handleEdit}
          onDelete={(item) => setItemToDelete(item)}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* Add / Edit Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!actionLoading) {
            setIsModalOpen(false);
            setSelectedTestimonial(null);
          }
        }}
        onSubmit={handleSubmit}
        testimonial={selectedTestimonial}
        loading={actionLoading}
      />

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title={`Delete Testimonial by "${itemToDelete?.name}"?`}
        message="This review will be permanently removed from the database and will no longer appear on the website."
        confirmLabel="Delete Review"
        variant="danger"
      />
    </div>
  );
}
