import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import TeamForm from "../../../components/admin/team/TeamForm";

import { getTeamMemberById, updateTeamMember } from "../../../api/team.api";

export default function EditTeamMember() {
  const { teamId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [initialData, setInitialData] = useState({
    photo: null,

    name: "",
    role: "",
    description: "",

    github: "",
    linkedin: "",
    twitter: "",
    email: "",

    order: 0,

    isActive: true,
  });

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const res = await getTeamMemberById(teamId);

      const member = res.data;

      setInitialData({
        photo: member.photo,

        name: member.name,
        role: member.role,
        description: member.description,

        github: member.github,
        linkedin: member.linkedin,
        twitter: member.twitter,
        email: member.email,

        order: member.order,

        isActive: member.isActive,
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to fetch team member.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("description", formData.description);

      data.append("github", formData.github);
      data.append("linkedin", formData.linkedin);
      data.append("twitter", formData.twitter);
      data.append("email", formData.email);

      data.append("order", formData.order);

      data.append("isActive", formData.isActive);

      if (formData.photo instanceof File) {
        data.append("photo", formData.photo);
      }

      await updateTeamMember(teamId, data);

      toast.success("Team member updated successfully.");

      navigate("/admin/team/manage");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to update team member.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="mx-auto max-w-6xl">
        <TeamForm
          title="Edit Team Member"
          buttonText="Update Member"
          initialData={initialData}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
