import api from "./axios";

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getUserActivity = async () => {
  const response = await api.get("/admin/activity");
  return response.data;
};
