import api from "./axios";

export const getAllUsers = () => api.get("/users");

export const createUser = (data) => api.post("/users", data);

export const updateUser = (userId, data) => api.patch(`/users/${userId}`, data);

export const updateProfile = (data) => api.patch("/profile/update", data);

export const deleteUser = (userId) => api.delete(`/users/${userId}`);

export const changePassword = (data) =>
  api.patch("/profile/change-password", data);

export const getCurrentUser = () => api.get("/profile/me");
