import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { forgotPassword } from "../../api/auth.api";
import { AuthHeader, AuthFooter } from "../../components/auth/AuthParts";
import {
  authInputClass,
  authLabelClass,
  authButtonClass,
} from "../../components/auth/authStyles";

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
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your email address and we will send you a password reset link."
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="email" className={authLabelClass}>
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            aria-hidden="true"
            className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
              errors.email ? "text-error" : "text-text-muted"
            }`}
          />

          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={loading}
            placeholder="Enter your email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={authInputClass(!!errors.email)}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </div>

        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="mt-1.5 text-xs font-medium text-error"
          >
            {errors.email.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-8 ${authButtonClass}`}
        >
          {loading ? (
            <>
              <Loader2 size={18} aria-hidden="true" className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <AuthFooter>
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary-dark transition-colors duration-200 hover:text-primary"
        >
          Login
        </Link>
      </AuthFooter>
    </>
  );
};

export default ForgotPassword;
