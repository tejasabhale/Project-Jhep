import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { forgotPassword } from "../../api/auth.api";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await forgotPassword({
        email: data.email,
      });

      toast.success("If your email exists, a reset link has been sent.");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
        >
          <h1 className="mb-4 text-center text-3xl font-bold text-slate-800">
            Forgot Password?
          </h1>

          <p className="mb-6 text-center text-sm text-slate-600">
            Enter your email address and we will send you a password reset link.
          </p>

          <input
            type="email"
            disabled={loading}
            placeholder="Email"
            className={`mb-2 w-full rounded-lg border px-4 py-3 outline-none transition ${
              errors.email
                ? "border-red-500"
                : "border-slate-300 focus:border-orange-500"
            }`}
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="mb-4 text-sm text-red-500">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Remember your password?{" "}
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

export default ForgotPassword;
