import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Users,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";
import { toast } from "react-hot-toast";

import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminToolbar from "../../../components/admin/ui/AdminToolbar";
import AdminStatusBadge from "../../../components/admin/ui/AdminStatusBadge";
import AdminConfirmDialog from "../../../components/admin/ui/AdminConfirmDialog";
import AdminEmptyState from "../../../components/admin/ui/AdminEmptyState";
import AdminErrorState from "../../../components/admin/ui/AdminErrorState";
import { TableSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import {
  AdminTableWrapper,
  AdminTable,
  AdminTableHeader,
  AdminTableHead,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
} from "../../../components/admin/ui/AdminTable";

import {
  fetchAllTeamMembers,
  removeTeamMember,
  toggleTeamMemberStatus,
} from "../../../api/adminServices";

export default function ManageTeamMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status toggle state
  const [togglingId, setTogglingId] = useState(null);

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllTeamMembers();
      setMembers(data);
    } catch (err) {
      console.error("Failed to load team members:", err);
      setError(err?.response?.data?.message || "Failed to load team members.");
      toast.error("Unable to load team members.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (member.name && member.name.toLowerCase().includes(q)) ||
        (member.role && member.role.toLowerCase().includes(q)) ||
        (member.email && member.email.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && member.isActive) ||
        (statusFilter === "inactive" && !member.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  // Stats calculation
  const totalCount = members.length;
  const activeCount = members.filter((m) => m.isActive).length;
  const inactiveCount = totalCount - activeCount;

  // Toggle active status
  const handleToggleStatus = async (member) => {
    try {
      setTogglingId(member._id);
      const nextActiveState = !member.isActive;
      await toggleTeamMemberStatus(member._id, nextActiveState);
      setMembers((prev) =>
        prev.map((m) =>
          m._id === member._id ? { ...m, isActive: nextActiveState } : m
        )
      );
      toast.success(
        `Member marked as ${nextActiveState ? "active" : "inactive"}.`
      );
    } catch (err) {
      console.error("Failed to toggle status:", err);
      toast.error("Could not update member status.");
    } finally {
      setTogglingId(null);
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await removeTeamMember(deleteTarget._id);
      setMembers((prev) => prev.filter((m) => m._id !== deleteTarget._id));
      toast.success(`"${deleteTarget.name}" was removed.`);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete member:", err);
      toast.error(err?.response?.data?.message || "Failed to delete member.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="Team Members"
        subtitle="Manage leadership, educators, and staff profiles displayed on the public site."
        badge={`${totalCount} ${totalCount === 1 ? "member" : "members"}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Team Members" },
        ]}
        actions={
          <Link
            to="/admin/team/add"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 active:opacity-90"
          >
            <Plus size={15} />
            Add Member
          </Link>
        }
      />

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Total Members
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {totalCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">All registered team profiles</p>
        </div>

        <div className="rounded-xl border border-success/20 bg-success/5 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-success">
              Active / Visible
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success">
              <Eye size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-success">
            {activeCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Live on public About/Team page</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Inactive / Hidden
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-text-muted">
              <EyeOff size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {inactiveCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Draft or disabled profiles</p>
        </div>
      </div>

      {/* Toolbar */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, role, or email..."
        totalCount={totalCount}
        filteredCount={filteredMembers.length}
        onReset={handleResetFilters}
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Statuses", value: "all" },
              { label: "Active Only", value: "active" },
              { label: "Inactive Only", value: "inactive" },
            ],
          },
        ]}
      />

      {/* Content State */}
      {loading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : error ? (
        <AdminErrorState
          title="Failed to Load Team"
          message={error}
          onRetry={loadMembers}
        />
      ) : members.length === 0 ? (
        <AdminEmptyState
          title="No team members yet"
          description="Get started by adding leadership, teachers, or administrators to your organization."
          actionLabel="Add Member"
          actionTo="/admin/team/add"
        />
      ) : filteredMembers.length === 0 ? (
        <AdminEmptyState
          isFiltered
          title="No matching members"
          description="No members match your search keywords or active filters."
          onResetFilters={handleResetFilters}
        />
      ) : (
        <>
          {/* Desktop SaaS Data Table */}
          <div className="hidden md:block">
            <AdminTableWrapper>
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead className="w-[32%]">Member</AdminTableHead>
                    <AdminTableHead className="w-[24%]">Role / Designation</AdminTableHead>
                    <AdminTableHead className="w-[12%]">Order</AdminTableHead>
                    <AdminTableHead className="w-[16%]">Status</AdminTableHead>
                    <AdminTableHead className="w-[16%] text-right">Actions</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>

                <AdminTableBody>
                  {filteredMembers.map((member) => (
                    <AdminTableRow key={member._id}>
                      {/* Member Info */}
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          {member.photo?.url ? (
                            <img
                              src={member.photo.url}
                              alt={member.name}
                              className="h-10 w-10 shrink-0 rounded-full object-cover border border-border"
                            />
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary font-semibold text-sm border border-primary/20">
                              {member.name ? member.name.charAt(0).toUpperCase() : <UserRound size={16} />}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="font-semibold text-text-primary truncate">
                              {member.name}
                            </div>
                            {member.email && (
                              <div className="text-xs text-text-secondary truncate mt-0.5">
                                {member.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </AdminTableCell>

                      {/* Role */}
                      <AdminTableCell>
                        <span className="text-sm font-medium text-text-primary">
                          {member.role || "—"}
                        </span>
                      </AdminTableCell>

                      {/* Order */}
                      <AdminTableCell>
                        <span className="inline-flex items-center font-mono text-xs font-semibold px-2 py-0.5 rounded bg-background border border-border text-text-primary">
                          #{member.order ?? 0}
                        </span>
                      </AdminTableCell>

                      {/* Status */}
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <AdminStatusBadge
                            status={member.isActive ? "active" : "inactive"}
                          />
                          <button
                            type="button"
                            disabled={togglingId === member._id}
                            onClick={() => handleToggleStatus(member)}
                            className="rounded px-2 py-0.5 text-[11px] font-medium text-text-secondary hover:bg-background hover:text-text-primary border border-transparent hover:border-border transition disabled:opacity-50"
                            title={member.isActive ? "Deactivate member" : "Activate member"}
                          >
                            {member.isActive ? "Hide" : "Show"}
                          </button>
                        </div>
                      </AdminTableCell>

                      {/* Actions */}
                      <AdminTableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/admin/team/edit/${member._id}`}
                            className="rounded-md p-1.5 text-text-secondary transition hover:bg-primary-light hover:text-primary"
                            title="Edit member"
                          >
                            <Pencil size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteTarget(member)}
                            className="rounded-md p-1.5 text-text-secondary transition hover:bg-red-50 hover:text-red-600"
                            title="Delete member"
                          >
                            <Trash2 size={15} />
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
          <div className="space-y-3 md:hidden">
            {filteredMembers.map((member) => (
              <div
                key={member._id}
                className="rounded-xl border border-border bg-surface p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {member.photo?.url ? (
                      <img
                        src={member.photo.url}
                        alt={member.name}
                        className="h-11 w-11 shrink-0 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary font-bold border border-primary/20">
                        {member.name ? member.name.charAt(0).toUpperCase() : <UserRound size={18} />}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-text-primary truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-primary font-medium truncate mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      to={`/admin/team/edit/${member._id}`}
                      className="rounded-lg p-2 text-text-secondary hover:bg-background"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(member)}
                      className="rounded-lg p-2 text-text-secondary hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-text-secondary">
                  <span className="font-mono bg-background border border-border px-2 py-0.5 rounded text-text-primary">
                    Order: #{member.order ?? 0}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(member)}
                    className="flex items-center gap-1.5"
                  >
                    <AdminStatusBadge
                      status={member.isActive ? "active" : "inactive"}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Member"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
}
