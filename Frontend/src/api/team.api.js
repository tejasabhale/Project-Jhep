import api from "./axios";

export const createTeamMember = async (data) => {
  const response = await api.post("/team", data);
  return response.data;
};

export const getTeamMembers = async () => {
  const response = await api.get("/team");
  return response.data;
};

export const getAllTeamMembers = async () => {
  const response = await api.get("/team/admin");
  return response.data;
};

export const getTeamMemberById = async (teamId) => {
  const response = await api.get(`/team/${teamId}`);
  return response.data;
};

export const updateTeamMember = async (teamId, data) => {
  const response = await api.patch(`/team/${teamId}`, data);
  return response.data;
};

export const deleteTeamMember = async (teamId) => {
  const response = await api.delete(`/team/${teamId}`);
  return response.data;
};
