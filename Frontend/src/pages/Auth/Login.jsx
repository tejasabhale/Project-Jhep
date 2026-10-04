import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { AuthHeader, AuthFooter } from "../../components/auth/AuthParts";
import {
  authInputClass,
  authLabelClass,
  authButtonClass,
} from "../../components/auth/authStyles";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to continue learning with Project Jhep."
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email / Username */}
        <div>
          <label htmlFor="identifier" className={authLabelClass}>
            Email or Username
          </label>

          <div className="relative">
            <Mail
              size={18}
              aria-hidden="true"
              className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
                errors.identifier ? "text-error" : "text-text-muted"
              }`}
            />

            <input
              id="identifier"
              type="text"
              autoComplete="username"
              disabled={loading}
              placeholder="Enter your email or username"
              aria-invalid={errors.identifier ? "true" : "false"}
              aria-describedby={
                errors.identifier ? "identifier-error" : undefined
              }
              className={authInputClass(!!errors.identifier)}
              {...register("identifier", {
                required: "Email or Username is required",
              })}
            />
          </div>

          {errors.identifier && (
            <p
              id="identifier-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-error"
            >
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-secondary"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary-dark transition-colors duration-200 hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole
              size={18}
              aria-hidden="true"
              className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
                errors.password ? "text-error" : "text-text-muted"
              }`}
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              disabled={loading}
              placeholder="Enter your password"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={authInputClass(!!errors.password, "pr-12")}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-text-muted transition-colors duration-200 hover:bg-surface-muted hover:text-primary-dark disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <EyeOff size={18} aria-hidden="true" />
              ) : (
                <Eye size={18} aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password && (
            <p
              id="password-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-error"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-8 ${authButtonClass}`}
        >
          {loading ? (
            <>
              <Loader2 size={18} aria-hidden="true" className="animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <AuthFooter>
        By continuing, you agree to use Project Jhep responsibly.
      </AuthFooter>
    </>
  );
};

export default Login;
