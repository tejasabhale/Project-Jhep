import { useState } from "react";
import { toast } from "react-hot-toast";

import TeamForm from "../../../components/admin/team/TeamForm";
import { createTeamMember } from "../../../api/team.api";

export default function AddTeamMember() {
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

      await createTeamMember(data);

      toast.success("Team member added successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to create team member.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="mx-auto max-w-6xl">
        <TeamForm
          title="Add Team Member"
          buttonText="Create Member"
          initialData={initialData}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
