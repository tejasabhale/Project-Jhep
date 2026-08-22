import api from "./axios";

export const registerUser = (data) => api.post("/auth/register", data);

export const verifyOtp = (data) => api.post("/auth/verify-otp", data);

export const loginUser = (data) => api.post("/auth/login", data);

export const logoutUser = () => api.post("/auth/logout");

export const resendOtp = (data) => api.post("/auth/resend-otp", data);

export const forgotPassword = (data) => api.post("/auth/forgot-password", data);

export const resetPassword = (token, data) =>
  api.post(`/auth/reset-password/${token}`, data);

