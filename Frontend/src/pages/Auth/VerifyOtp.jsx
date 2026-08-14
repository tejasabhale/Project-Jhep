import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { verifyAccount } = useAuth();

  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please login again.");

      navigate("/login", {
        replace: true,
      });
    }
  }, [email, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await verifyAccount({
        email,
        otp: data.otp,
      });

      toast.success("Account verified successfully.");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "OTP verification failed.");
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
          <h1 className="mb-3 text-center text-3xl font-bold text-slate-800">
            Verify OTP
          </h1>

          <p className="mb-6 text-center text-sm text-slate-600">
            Enter the 6-digit OTP sent to
            <br />
            <span className="font-medium text-orange-600">{email}</span>
          </p>

          <input
            type="text"
            maxLength={6}
            disabled={loading}
            placeholder="Enter OTP"
            className="mb-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-xl tracking-[8px] outline-none focus:border-orange-500"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Enter a valid 6-digit OTP",
              },
            })}
          />

          {errors.otp && (
            <p className="mb-4 text-sm text-red-500">{errors.otp.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Wrong email?{" "}
            <Link
              to="/register"
              className="font-medium text-orange-600 hover:underline"
            >
              Register again
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default VerifyOtp;
