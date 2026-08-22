import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Users,
  ArrowUpDown,
  UserRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { getAllTeamMembers, deleteTeamMember } from "../../../api/team.api";

export default function ManageTeamMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await getAllTeamMembers();
      setMembers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch team members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (teamId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTeamMember(teamId);

      toast.success("Team member deleted successfully.");
      fetchMembers();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to delete member.");
    }
  };

  const activeMembers = members.filter((member) => member.isActive).length;
  const inactiveMembers = members.length - activeMembers;

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-64 rounded-xl bg-gray-100" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="h-24 rounded-2xl bg-gray-100" />
              <div className="h-24 rounded-2xl bg-gray-100" />
              <div className="h-24 rounded-2xl bg-gray-100" />
            </div>

            <div className="h-96 rounded-2xl bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Users size={20} />
              </div>

              <h1
                className="text-2xl font-semibold text-gray-900 sm:text-3xl"
                style={{
                  fontFamily: "'Fraunces', serif",
                }}
              >
                Manage Team
              </h1>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Manage your team members and their visibility on the website.
            </p>
          </div>

          <Link
            to="/admin/team/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md"
          >
            <Plus size={18} />
            Add Member
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Members
                </p>

                <h3
                  className="mt-2 text-2xl font-semibold text-gray-900"
                  style={{
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  {members.length}
                </h3>

                <p className="mt-1 text-xs text-gray-400">All team members</p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Users size={21} />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Members
                </p>

                <h3
                  className="mt-2 text-2xl font-semibold text-gray-900"
                  style={{
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  {activeMembers}
                </h3>

                <p className="mt-1 text-xs text-gray-400">Visible on website</p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Eye size={21} />
              </div>
            </div>
          </div>

          {/* Inactive */}
          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Inactive Members
                </p>

                <h3
                  className="mt-2 text-2xl font-semibold text-gray-900"
                  style={{
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  {inactiveMembers}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Hidden from website
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                <EyeOff size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-orange-100 px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold text-gray-900">Team Members</h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {members.length} {members.length === 1 ? "member" : "members"}{" "}
                found
              </p>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-orange-100 bg-orange-50/60">
                  <th className="w-[34%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Member
                  </th>

                  <th className="w-[24%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Role
                  </th>

                  <th className="w-[14%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <div className="flex items-center gap-1.5">
                      Order
                      <ArrowUpDown size={13} />
                    </div>
                  </th>

                  <th className="w-[14%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Status
                  </th>

                  <th className="w-[14%] px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                          <Users size={25} />
                        </div>

                        <h3 className="mt-4 font-semibold text-gray-900">
                          No team members yet
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Add your first team member to get started.
                        </p>

                        <Link
                          to="/admin/team/add"
                          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                          <Plus size={17} />
                          Add Member
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr
                      key={member._id}
                      className="transition hover:bg-orange-50/30"
                    >
                      {/* Member */}
                      <td className="px-6 py-4 align-middle">
                        <div className="flex min-w-0 items-center gap-3">
                          {member.photo?.url ? (
                            <img
                              src={member.photo.url}
                              alt={member.name}
                              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-orange-50"
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                              <UserRound size={19} />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">
                              {member.name}
                            </p>

                            <p className="text-xs text-gray-500">Team Member</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 align-middle">
                        <p className="truncate text-sm font-medium text-gray-700">
                          {member.role}
                        </p>
                      </td>

                      {/* Order */}
                      <td className="px-6 py-4 align-middle">
                        <span className="text-sm font-medium text-gray-600">
                          #{member.order}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 align-middle">
                        {member.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                            <Eye size={14} />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                            <EyeOff size={14} />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/team/edit/${member._id}`}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                            title="Edit member"
                          >
                            <Pencil size={17} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(member._id)}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete member"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-gray-100 md:hidden">
            {members.length === 0 ? (
              <div className="px-5 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Users size={25} />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  No team members yet
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add your first team member to get started.
                </p>

                <Link
                  to="/admin/team/add"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Plus size={17} />
                  Add Member
                </Link>
              </div>
            ) : (
              members.map((member) => (
                <div
                  key={member._id}
                  className="p-4 transition hover:bg-orange-50/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {member.photo?.url ? (
                        <img
                          src={member.photo.url}
                          alt={member.name}
                          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-orange-50"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                          <UserRound size={20} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {member.name}
                        </p>

                        <p className="mt-0.5 truncate text-sm text-orange-600">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <Link
                        to={`/admin/team/edit/${member._id}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                        title="Edit member"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(member._id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete member"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="text-sm text-gray-500">
                      Display Order:{" "}
                      <span className="font-semibold text-gray-700">
                        #{member.order}
                      </span>
                    </div>

                    {member.isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                        <Eye size={13} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                        <EyeOff size={13} />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
