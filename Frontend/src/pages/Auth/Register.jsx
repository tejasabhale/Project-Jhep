import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
        mobileNo: data.mobileNo,
        password: data.password,
      };

      await registerUser(payload);

      toast.success("Registration successful. Verify your OTP.");

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
          Create Account
        </h1>

        {/* Full Name */}
        <input
          disabled={loading}
          placeholder="Full Name"
          className="mb-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          {...register("fullName", {
            required: "Full name is required",
          })}
        />

        {errors.fullName && (
          <p className="mb-3 text-sm text-red-500">{errors.fullName.message}</p>
        )}

        {/* Username */}
        <input
          disabled={loading}
          placeholder="Username"
          className="mb-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          {...register("userName", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters required",
            },
          })}
        />

        {errors.userName && (
          <p className="mb-3 text-sm text-red-500">{errors.userName.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          disabled={loading}
          placeholder="Email"
          className="mb-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="mb-3 text-sm text-red-500">{errors.email.message}</p>
        )}

        {/* Mobile */}
        <input
          disabled={loading}
          placeholder="Mobile Number"
          className="mb-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          {...register("mobileNo", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10 digit mobile number",
            },
          })}
        />

        {errors.mobileNo && (
          <p className="mb-3 text-sm text-red-500">{errors.mobileNo.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          disabled={loading}
          placeholder="Password"
          className="mb-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters required",
            },
          })}
        />

        {errors.password && (
          <p className="mb-5 text-sm text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
