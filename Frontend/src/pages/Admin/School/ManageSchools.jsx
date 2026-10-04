import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus, School, Building2 } from "lucide-react";

import SchoolTable from "../../../components/admin/schools/SchoolTable";
import SchoolModal from "../../../components/admin/schools/SchoolModal";
import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminToolbar from "../../../components/admin/ui/AdminToolbar";
import AdminConfirmDialog from "../../../components/admin/ui/AdminConfirmDialog";
import AdminEmptyState from "../../../components/admin/ui/AdminEmptyState";
import { TableSkeleton } from "../../../components/admin/ui/AdminSkeleton";

import {
  fetchAllSchools,
  saveSchool,
  removeSchool,
  toggleSchoolActive,
} from "../../../api/adminServices";

export default function ManageSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Modals
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const data = await fetchAllSchools();
      setSchools(data || []);
    } catch (error) {
      console.error("Failed to fetch schools:", error);
      toast.error(error.response?.data?.message || "Failed to load schools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const filteredSchools = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return schools.filter((school) => {
      const matchesSearch =
        !searchValue ||
        school.name?.toLowerCase().includes(searchValue) ||
        school.location?.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "all" ||
        (status === "active" && school.isActive === true) ||
        (status === "inactive" && school.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [schools, search, status]);

  const hasFilters = Boolean(search.trim() || status !== "all");

  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  const handleAddSchool = () => {
    setSelectedSchool(null);
    setIsSchoolModalOpen(true);
  };

  const handleEditSchool = (school) => {
    setSelectedSchool(school);
    setIsSchoolModalOpen(true);
  };

  const handleSchoolSubmit = async (formData) => {
    try {
      setActionLoading(true);

      if (selectedSchool) {
        await saveSchool(formData, selectedSchool._id);
        toast.success("School updated successfully");
      } else {
        await saveSchool(formData);
        toast.success("School created successfully");
      }

      setIsSchoolModalOpen(false);
      setSelectedSchool(null);
      await fetchSchools();
    } catch (error) {
      console.error("Failed to save school:", error);
      toast.error(error.response?.data?.message || "Failed to save school");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSchool = async () => {
    if (!schoolToDelete) return;

    try {
      setDeleteLoading(true);
      await removeSchool(schoolToDelete._id);
      toast.success("School deleted successfully");
      setSchools((prev) => prev.filter((s) => s._id !== schoolToDelete._id));
      setSchoolToDelete(null);
    } catch (error) {
      console.error("Failed to delete school:", error);
      toast.error(error.response?.data?.message || "Failed to delete school");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleStatus = async (school) => {
    try {
      await toggleSchoolActive(school._id);
      setSchools((prev) =>
        prev.map((s) =>
          s._id === school._id ? { ...s, isActive: !s.isActive } : s
        )
      );
      toast.success(
        school.isActive ? "School deactivated" : "School activated"
      );
    } catch (error) {
      console.error("Failed to toggle status:", error);
      toast.error(error.response?.data?.message || "Failed to toggle status");
    }
  };

  const activeCount = schools.filter((s) => s.isActive).length;
  const inactiveCount = schools.length - activeCount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        title="Partner Schools"
        subtitle="Manage government and partner educational institutions collaborating with Project Jhep."
        badge={`${schools.length} ${schools.length === 1 ? "school" : "schools"}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Schools" },
        ]}
        actions={
          <button
            type="button"
            onClick={handleAddSchool}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 active:opacity-90"
          >
            <Plus size={15} />
            <span>Add School</span>
          </button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Total Schools
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <School size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {schools.length}
          </div>
          <p className="mt-1 text-xs text-text-muted">Registered educational partners</p>
        </div>

        <div className="rounded-xl border border-success/20 bg-success/5 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-success">
              Active Partners
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success">
              <Building2 size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-success">
            {activeCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Currently active & visible</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Inactive
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-text-muted">
              <School size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {inactiveCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Hidden or archived partners</p>
        </div>
      </div>

      {/* Toolbar */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search schools by name or location..."
        totalItems={schools.length}
        showingItems={filteredSchools.length}
        hasActiveFilters={hasFilters}
        onClearFilters={handleClearFilters}
        filters={[
          {
            id: "status",
            label: "Status Filter",
            value: status,
            onChange: setStatus,
            options: [
              { label: "All Statuses", value: "all" },
              { label: "Active Partners", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ]}
      />

      {/* Table / Empty State */}
      {loading ? (
        <TableSkeleton rows={5} />
      ) : schools.length === 0 ? (
        <AdminEmptyState
          title="No partner schools yet"
          description="Register your first partner school to showcase collaboration impact on the platform."
          icon={School}
          actionLabel="Add School"
          onAction={handleAddSchool}
        />
      ) : filteredSchools.length === 0 ? (
        <AdminEmptyState
          isFiltered={true}
          onClearFilters={handleClearFilters}
        />
      ) : (
        <SchoolTable
          schools={filteredSchools}
          onEdit={handleEditSchool}
          onDelete={(school) => setSchoolToDelete(school)}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* Add / Edit Modal */}
      <SchoolModal
        isOpen={isSchoolModalOpen}
        school={selectedSchool}
        onClose={() => {
          if (!actionLoading) {
            setIsSchoolModalOpen(false);
            setSelectedSchool(null);
          }
        }}
        onSubmit={handleSchoolSubmit}
        loading={actionLoading}
      />

      {/* Reusable Confirm Dialog */}
      <AdminConfirmDialog
        isOpen={Boolean(schoolToDelete)}
        onClose={() => setSchoolToDelete(null)}
        onConfirm={handleDeleteSchool}
        loading={deleteLoading}
        title={`Delete School "${schoolToDelete?.name}"?`}
        message="This will permanently delete this school record from the platform database."
        confirmLabel="Delete School"
        variant="danger"
      />
    </div>
  );
}
