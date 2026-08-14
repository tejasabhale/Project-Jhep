import api from "./axios";
import axios from "./axios";

export const createLessonContent = (data) => {
  return api.post("/admin/content", data);
};

export const getContents = (params) => {
  return api.get("/admin/content", {
    params,
  });
};

export const getContentById = (id) => {
  return api.get(`/admin/content/${id}`);
};

export const updateContent = (id, data) => {
  return api.patch(`/admin/content/${id}`, data);
};

export const deleteContent = (id) => {
  return api.delete(`/admin/content/${id}`);
};
