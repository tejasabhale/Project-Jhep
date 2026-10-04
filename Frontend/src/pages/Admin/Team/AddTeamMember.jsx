import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import TeamForm from "../../../components/admin/team/TeamForm";
import { createTeamMember } from "../../../api/team.api";

export default function AddTeamMember() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialData = {
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

      await createTeamMember(data);
      toast.success("Team member added successfully.");
      navigate("/admin/team/manage");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Unable to create team member."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add Team Member"
        subtitle="Create a new leadership, educator, or staff profile for your team."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Team Members", href: "/admin/team/manage" },
          { label: "Add Member" },
        ]}
        backTo="/admin/team/manage"
      />

      <TeamForm
        title="New Team Member"
        buttonText="Create Member"
        initialData={initialData}
        loading={loading}
        onSubmit={handleSubmit}
        backTo="/admin/team/manage"
      />
    </div>
  );
}
