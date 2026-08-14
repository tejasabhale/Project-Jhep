import api from "./axios";

export const getAllTestimonials = async () => {
  const response = await api.get("/testimonials");
  return response.data;
};

export const getAllTestimonialsForAdmin = async () => {
  const response = await api.get("/testimonials/admin/all");
  return response.data;
};

export const getTestimonialById = async (id) => {
  const response = await api.get(`/testimonials/${id}`);
  return response.data;
};

export const createTestimonial = async (data) => {
  const response = await api.post("/testimonials", data);
  return response.data;
};

export const updateTestimonial = async (id, data) => {
  const response = await api.patch(`/testimonials/${id}`, data);
  return response.data;
};

export const toggleTestimonialStatus = async (id) => {
  const response = await api.patch(`/testimonials/${id}/toggle-status`);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await api.delete(`/testimonials/${id}`);
  return response.data;
};
