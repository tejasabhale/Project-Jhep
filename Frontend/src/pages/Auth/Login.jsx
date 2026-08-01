import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const identifier = data.identifier.trim();

      const payload = {
        password: data.password,
      };

      if (identifier.includes("@")) {
        payload.email = identifier;
      } else {
        payload.userName = identifier;
      }

      await login(payload);

      toast.success("Login successful!");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      const response = error.response?.data;

      if (response?.data?.requiresVerification) {
        toast.success("A new OTP has been sent to your email.");

        navigate("/verify-otp", {
          state: {
            email: response.data.email,
          },
          replace: true,
        });

        return;
      }

      toast.error(response?.message || error.message || "Login failed");
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
          <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>

          {/* Email / Username */}
          <div className="mb-4">
            <input
              type="text"
              autoComplete="username"
              disabled={loading}
              placeholder="Email or Username"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                errors.identifier
                  ? "border-red-500"
                  : "border-slate-300 focus:border-orange-500"
              }`}
              {...register("identifier", {
                required: "Email or Username is required",
              })}
            />

            {errors.identifier && (
              <p className="mt-1 text-sm text-red-500">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              autoComplete="current-password"
              disabled={loading}
              placeholder="Password"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                errors.password
                  ? "border-red-500"
                  : "border-slate-300 focus:border-orange-500"
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Links */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link
              to="/register"
              className="font-medium text-orange-600 hover:underline"
            >
              Create Account
            </Link>

            <Link
              to="/forgot-password"
              className="font-medium text-orange-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
