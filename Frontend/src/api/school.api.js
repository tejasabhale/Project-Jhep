import api from "./axios";

const getAllSchools = () => {
  return api.get("/schools");
};

const getAllSchoolsForAdmin = () => {
  return api.get("/schools/admin/all");
};

const getSchoolById = (id) => {
  return api.get(`/schools/${id}`);
};

const createSchool = (data) => {
  return api.post("/schools", data);
};

const updateSchool = (id, data) => {
  return api.patch(`/schools/${id}`, data);
};

const toggleSchoolStatus = (id) => {
  return api.patch(`/schools/${id}/toggle-status`);
};

const deleteSchool = (id) => {
  return api.delete(`/schools/${id}`);
};

export {
  getAllSchools,
  getAllSchoolsForAdmin,
  getSchoolById,
  createSchool,
  updateSchool,
  toggleSchoolStatus,
  deleteSchool,
};
