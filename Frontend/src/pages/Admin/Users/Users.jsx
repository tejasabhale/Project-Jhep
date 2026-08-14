import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
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
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>

          <p className="text-gray-500">
            {currentUser?.role === "owner"
              ? "Manage administrator and user accounts."
              : "Manage users created by you."}
          </p>
        </div>

        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <UserStats users={users} />

      <UserFilters
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        currentUser={currentUser}
      />

      <UserTable
        users={filteredUsers}
        currentUser={currentUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

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
