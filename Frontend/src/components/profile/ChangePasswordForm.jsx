import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

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
      toast.error(error.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-orange-100
      shadow-sm
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
        Change Password
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          required
          className="
            w-full
            border
            border-orange-200
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-orange-400
          "
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
          className="
            w-full
            border
            border-orange-200
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-orange-400
          "
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="
            w-full
            border
            border-orange-200
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-orange-400
          "
        />

        <button
          disabled={loading}
          className="
            bg-orange-500
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-orange-600
            disabled:opacity-50
            transition
          "
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
