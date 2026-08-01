import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getCurrentUser, updateProfile } from "../../api/user.api";

import ProfileCard from "../../components/profile/ProfileCard";
import UpdateProfileForm from "../../components/profile/UpdateProfileForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();

      setUser(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (data) => {
    try {
      const res = await updateProfile(data);
      setUser(res.data.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error.response?.data);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-orange-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-orange-50
      px-4
      py-10
    "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        space-y-8
      "
      >
        <ProfileCard user={user} />

        <div
          className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-orange-100
          p-6
        "
        >
          <h2
            className="
            text-xl
            font-bold
            text-orange-600
            mb-5
          "
          >
            Update Profile
          </h2>

          <UpdateProfileForm user={user} onSubmit={handleUpdate} />
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default Profile;
