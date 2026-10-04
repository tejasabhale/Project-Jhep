import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Users as UsersIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminToolbar from "../../../components/admin/ui/AdminToolbar";
import AdminConfirmDialog from "../../../components/admin/ui/AdminConfirmDialog";
import AdminEmptyState from "../../../components/admin/ui/AdminEmptyState";
import AdminErrorState from "../../../components/admin/ui/AdminErrorState";
import { TableSkeleton } from "../../../components/admin/ui/AdminSkeleton";

import UserStats from "../../../components/admin/users/UserStats";
import UserTable from "../../../components/admin/users/UserTable";
import UserModal from "../../../components/admin/users/UserModal";

import useAuth from "../../../hooks/useAuth";
import {
  fetchAllUsers,
  saveUser,
  removeUser,
  fetchUserActivities,
} from "../../../api/adminServices";

export default function Users() {
  const { user: currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // If navigated to /admin/users/add, automatically open user creation modal
  useEffect(() => {
    if (location.pathname === "/admin/users/add") {
      setIsModalOpen(true);
    }
  }, [location.pathname]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [usersData, actsData] = await Promise.all([
        fetchAllUsers(),
        fetchUserActivities().catch(() => []),
      ]);
      setUsers(usersData || []);
      setActivities(actsData || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(err?.response?.data?.message || "Failed to fetch users.");
      toast.error("Unable to load user accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Map each user ID to their latest activity record
  const activityMap = useMemo(() => {
    const map = new Map();
    // activities are sorted by createdAt: -1 in backend
    activities.forEach((act) => {
      const uId = act.user?._id || act.user;
      if (uId && !map.has(uId.toString())) {
        map.set(uId.toString(), act);
      }
    });
    return map;
  }, [activities]);

  const activeSessionsCount = useMemo(() => {
    return activities.filter((a) => a.status === "active").length;
  }, [activities]);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();

    return users.filter((u) => {
      const matchesSearch =
        !q ||
        (u.fullName ?? "").toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q) ||
        (u.userName ?? "").toLowerCase().includes(q) ||
        (u.mobileNo ?? "").toLowerCase().includes(q);

      const matchesRole = roleFilter === "all" || u.role === roleFilter;

      const act = activityMap.get(u._id?.toString());
      const isActiveSession = act?.status === "active";
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActiveSession) ||
        (statusFilter === "offline" && !isActiveSession);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter, activityMap]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setDeleteLoading(true);
      await removeUser(userToDelete._id);
      toast.success(
        `User "${userToDelete.fullName || userToDelete.userName}" deleted successfully.`
      );
      setUserToDelete(null);
      await loadData();
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error(err?.response?.data?.message || "Failed to delete user.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await saveUser(formData, selectedUser._id);
        toast.success("User account updated successfully.");
      } else {
        await saveUser(formData);
        toast.success("User account created successfully.");
      }

      await loadData();
      setIsModalOpen(false);
      setSelectedUser(null);
      if (location.pathname === "/admin/users/add") {
        navigate("/admin/users/manage", { replace: true });
      }
    } catch (err) {
      console.error("User save error:", err);
      toast.error(err?.response?.data?.message || "Failed to save user account.");
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const totalCount = users.length;
  const hasActiveFilters = Boolean(
    search.trim() || roleFilter !== "all" || statusFilter !== "all"
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        title="Manage Users"
        subtitle={
          currentUser?.role === "owner"
            ? "Manage administrators, staff, and learner accounts across Project Jhep."
            : "Manage platform user accounts created under your administration."
        }
        badge={`${totalCount} ${totalCount === 1 ? "account" : "accounts"}`}
        breadcrumbs={[
          { label: "Dashboard", path: "/admin" },
          { label: "Users" },
        ]}
        actions={
          <button
            type="button"
            onClick={handleAddUser}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-dark transition"
          >
            <Plus size={16} />
            <span>Add User</span>
          </button>
        }
      />

      {/* Stats Summary */}
      <UserStats users={users} activeCount={activeSessionsCount} />

      {/* Toolbar */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, username, email, or mobile..."
        totalItems={totalCount}
        showingItems={filteredUsers.length}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleResetFilters}
        filters={[
          {
            id: "role",
            label: "Role Filter",
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
              { label: "All Roles", value: "all" },
              { label: "Owners", value: "owner" },
              { label: "Administrators", value: "admin" },
              { label: "Learners / Users", value: "user" },
            ],
          },
          {
            id: "status",
            label: "Session Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Statuses", value: "all" },
              { label: "Active Now (Online)", value: "active" },
              { label: "Standard / Offline", value: "offline" },
            ],
          },
        ]}
      />

      {/* Table / Error / Loading Content */}
      {loading ? (
        <TableSkeleton rows={6} />
      ) : error ? (
        <AdminErrorState
          title="Failed to Load Users"
          message={error}
          onRetry={loadData}
        />
      ) : users.length === 0 ? (
        <AdminEmptyState
          title="No users created yet"
          description="Create your first user account to start onboarding administrators and learners."
          actionLabel="Add User"
          onAction={handleAddUser}
        />
      ) : filteredUsers.length === 0 ? (
        <AdminEmptyState
          isFiltered
          title="No matching users found"
          description="No users matched your search keywords or filter criteria."
          onClearFilters={handleResetFilters}
        />
      ) : (
        <UserTable
          users={filteredUsers}
          activityMap={activityMap}
          currentUser={currentUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

      {/* Add / Edit User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
          if (location.pathname === "/admin/users/add") {
            navigate("/admin/users/manage", { replace: true });
          }
        }}
        currentUser={currentUser}
        user={selectedUser}
        onSubmit={handleSubmit}
      />

      {/* Delete User Confirmation */}
      <AdminConfirmDialog
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDeleteUser}
        title="Delete User Account"
        description={`Are you sure you want to permanently delete "${userToDelete?.fullName || userToDelete?.userName}" (${userToDelete?.email})? This action cannot be undone.`}
        confirmLabel="Delete User"
        loading={deleteLoading}
      />
    </div>
  );
}
