import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserRound, Settings, ShieldCheck } from "lucide-react";

import { getCurrentUser, updateProfile } from "../../api/user.api";

import ProfileCard from "../../components/profile/ProfileCard";
import UpdateProfileForm from "../../components/profile/UpdateProfileForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (data) => {
    try {
      setUpdating(true);

      const res = await updateProfile(data);

      setUser(res.data.data);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-9 w-64 rounded-lg bg-slate-200" />
              <div className="h-4 w-96 max-w-full rounded bg-slate-200" />
            </div>

            {/* Profile */}
            <div className="h-40 rounded-3xl bg-white shadow-sm" />

            {/* Personal Information */}
            <div className="h-80 rounded-3xl bg-white shadow-sm" />

            {/* Security */}
            <div className="h-80 rounded-3xl bg-white shadow-sm" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <UserRound size={26} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't retrieve your account information. Please refresh the
            page and try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-orange-500">
            <UserRound size={17} />
            <span>Profile</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Account Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your personal information, account preferences, and security
            settings from one place.
          </p>
        </header>

        <div className="space-y-6">
          <ProfileCard user={user} />

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Settings size={21} strokeWidth={2} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-500">
                    Update your basic account information.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <UpdateProfileForm
                user={user}
                onSubmit={handleUpdate}
                loading={updating}
              />
            </div>
          </section>

          <ChangePasswordForm />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} />

          <span>
            Your account information is protected and securely stored.
          </span>
        </div>
      </div>
    </main>
  );
};

export default Profile;
