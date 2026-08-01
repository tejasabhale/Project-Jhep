import api from "./axios";

export const getLessonContents = async (lessonId) => {
  const response = await api.get(`/lesson-content/${lessonId}`);
  return response.data;
};

export const createLessonContent = async (data) => {
  const response = await api.post("/lesson-content", data);
  return response.data;
};

export const deleteLessonContent = async (contentId) => {
  const response = await api.delete(`/lesson-content/${contentId}`);
  return response.data;
};

export const updateLessonContent = async (contentId, data) => {
  const response = await api.patch(`/lesson-content/${contentId}`, data);
  return response.data;
};

export const getAllLessonContents = async () => {
  const response = await api.get("/lesson-content");
  return response.data;
};

export const getLessonContentById = async (contentId) => {
  const response = await api.get(`/lesson-content/content/${contentId}`);
  return response.data;
};
