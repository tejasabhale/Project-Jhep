import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Users as UsersIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import Loader from "../../../components/common/Loader";

import UserStats from "../../../components/admin/users/UserStats";
import UserFilters from "../../../components/admin/users/UserFilters";
import UserTable from "../../../components/admin/users/UserTable";
import UserModal from "../../../components/admin/users/UserModal";
import DeleteUserModal from "../../../components/admin/users/DeleteUserModal";

import useAuth from "../../../hooks/useAuth";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../api/user.api";

export default function Users() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        (user.fullName ?? "").toLowerCase().includes(searchTerm) ||
        (user.email ?? "").toLowerCase().includes(searchTerm);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

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
    setDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setDeleteLoading(true);

      await deleteUser(userToDelete._id);

      toast.success("User deleted successfully");

      await fetchUsers();

      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, formData);
        toast.success("User updated successfully");
      } else {
        await createUser(formData);
        toast.success("User created successfully");
      }

      await fetchUsers();

      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:flex">
            <UsersIcon size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Manage Users
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {currentUser?.role === "owner"
                ? "Manage administrator and user accounts."
                : "Manage users created by you."}
            </p>
          </div>
        </div>

        <button
          onClick={handleAddUser}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:bg-orange-700"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <UserStats users={users} />

      {/* Filters + Table grouped in one card for a cohesive, professional block */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4 sm:p-5">
          <UserFilters
            search={search}
            setSearch={setSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            currentUser={currentUser}
          />
        </div>

        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <UsersIcon size={22} />
            </div>
            <p className="text-sm font-medium text-gray-900">No users found</p>
            <p className="max-w-sm text-sm text-gray-500">
              {search || roleFilter !== "all"
                ? "Try adjusting your search or filter to find who you're looking for."
                : "Get started by adding your first user."}
            </p>
          </div>
        ) : (
          <UserTable
            users={filteredUsers}
            currentUser={currentUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        currentUser={currentUser}
        user={selectedUser}
        onSubmit={handleSubmit}
      />

      <DeleteUserModal
        isOpen={deleteModalOpen}
        user={userToDelete}
        loading={deleteLoading}
        onClose={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
}
