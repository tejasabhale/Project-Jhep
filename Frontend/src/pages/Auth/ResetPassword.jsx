import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { resetPassword } from "../../api/auth.api";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await resetPassword(token, {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      toast.success("Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
        >
          <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
            Reset Password
          </h1>

          {/* New Password */}
          <input
            type="password"
            disabled={loading}
            placeholder="New Password"
            className={`mb-2 w-full rounded-lg border px-4 py-3 outline-none ${
              errors.newPassword
                ? "border-red-500"
                : "border-slate-300 focus:border-orange-500"
            }`}
            {...register("newPassword", {
              required: "New password is required",

              minLength: {
                value: 8,
                message: "Password must contain minimum 8 characters",
              },

              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,

                message:
                  "Password must contain uppercase, lowercase, number and special character",
              },
            })}
          />

          {errors.newPassword && (
            <p className="mb-4 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            disabled={loading}
            placeholder="Confirm Password"
            className={`mb-2 w-full rounded-lg border px-4 py-3 outline-none ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-slate-300 focus:border-orange-500"
            }`}
            {...register("confirmPassword", {
              required: "Confirm password is required",

              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />

          {errors.confirmPassword && (
            <p className="mb-4 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Remember password?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
