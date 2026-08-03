import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-orange-100 p-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Manage Team Members
          </h1>

          <Link
            to="/admin/team/add"
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Member
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="p-4 text-left">Photo</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500">
                    No team members found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member._id} className="border-b">
                    <td className="p-4">
                      <img
                        src={member.photo?.url}
                        alt={member.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    </td>

                    <td className="p-4 font-medium">{member.name}</td>

                    <td className="p-4">{member.role}</td>

                    <td className="p-4">{member.order}</td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          member.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/team/edit/${member._id}`}
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(member._id)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
