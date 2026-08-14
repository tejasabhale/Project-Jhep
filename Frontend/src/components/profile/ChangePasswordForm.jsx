import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { changePassword } from "../../api/user.api";
import useAuth from "../../hooks/useAuth";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await changePassword(form);

      toast.success("Password updated. Please login again.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      await logout();

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter your current password",
    },
    {
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter your new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm your new password",
    },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <LockKeyhole size={21} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Account Security
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map(({ name, label, placeholder }, index) => {
            const visible = showPassword[name];

            return (
              <div key={name} className={index === 0 ? "md:col-span-2" : ""}>
                <label
                  htmlFor={name}
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {label}
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id={name}
                    name={name}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3
                      pl-11
                      pr-12
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-orange-200
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-400/10
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />

                  <button
                    type="button"
                    onClick={() => togglePassword(name)}
                    disabled={loading}
                    aria-label={visible ? "Hide password" : "Show password"}
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      p-1.5
                      text-slate-400
                      transition
                      hover:bg-slate-100
                      hover:text-slate-600
                    "
                  >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Information */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-orange-500" />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Password security
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              After changing your password, you will be logged out and asked to
              sign in again.
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-orange-500
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              shadow-orange-500/20
              transition
              hover:bg-orange-600
              hover:shadow-md
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <ShieldCheck size={17} />

            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
