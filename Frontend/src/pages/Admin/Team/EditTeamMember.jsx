import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import { FormSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import TeamForm from "../../../components/admin/team/TeamForm";
import { getTeamMemberById, updateTeamMember } from "../../../api/team.api";

export default function EditTeamMember() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [initialLoading, setInitialLoading] = useState(true);
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
  }, [teamId]);

  const fetchMember = async () => {
    try {
      setInitialLoading(true);
      const res = await getTeamMemberById(teamId);
      const member = res.data;

      setInitialData({
        photo: member.photo,
        name: member.name || "",
        role: member.role || "",
        description: member.description || "",
        github: member.github || "",
        linkedin: member.linkedin || "",
        twitter: member.twitter || "",
        email: member.email || "",
        order: member.order ?? 0,
        isActive: Boolean(member.isActive),
      });
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch team member details.");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("description", formData.description || "");
      data.append("github", formData.github || "");
      data.append("linkedin", formData.linkedin || "");
      data.append("twitter", formData.twitter || "");
      data.append("email", formData.email || "");
      data.append("order", formData.order ?? 0);
      data.append("isActive", formData.isActive ? "true" : "false");

      if (formData.photo instanceof File) {
        data.append("photo", formData.photo);
      }

      await updateTeamMember(teamId, data);
      toast.success("Team member updated successfully.");
      navigate("/admin/team/manage");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Unable to update team member."
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="Edit Team Member"
          subtitle="Loading member profile..."
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Team Members", href: "/admin/team/manage" },
            { label: "Edit Member" },
          ]}
          backTo="/admin/team/manage"
        />
        <FormSkeleton fields={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit Team Member"
        subtitle={`Update profile and settings for ${initialData?.name || "member"}.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Team Members", href: "/admin/team/manage" },
          { label: initialData.name || "Edit Member" },
        ]}
        backTo="/admin/team/manage"
      />

      <TeamForm
        title="Edit Team Member"
        buttonText="Update Member"
        initialData={initialData}
        loading={loading}
        onSubmit={handleSubmit}
        backTo="/admin/team/manage"
      />
    </div>
  );
}
