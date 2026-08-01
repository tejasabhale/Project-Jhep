import axios from "./axios";

// Dashboard
export const getDashboard = () => {
  return axios.get("/admin/dashboard");
};

// Users
export const getUsers = (params) => {
  return axios.get("/admin/users", { params });
};

export const approveUser = (id) => {
  return axios.patch(`/admin/users/${id}/approve`);
};

export const blockUser = (id) => {
  return axios.patch(`/admin/users/${id}/block`);
};

export const unblockUser = (id) => {
  return axios.patch(`/admin/users/${id}/unblock`);
};
