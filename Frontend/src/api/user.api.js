import api from "./axios";

export const getCurrentUser = () => api.get("/profile/me");

export const updateProfile = (data) => api.patch("/profile/update", data);

export const changePassword = (data) =>
  api.patch("/profile/change-password", data);
