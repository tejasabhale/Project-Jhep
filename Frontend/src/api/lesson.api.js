import api from "./axios";

export const getLessonById = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}`);
  return response.data;
};

export const getLessonsByTopic = async (topicId) => {
  const response = await api.get(`/topics/${topicId}/lessons`);
  return response.data;
};

export const getLessons = async () => {
  const response = await api.get("/lessons");
  return response.data;
};

export const createLesson = (data) =>
  api.post("/lessons", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateLesson = (lessonId, data) =>
  api.patch(`/lessons/${lessonId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteLesson = (lessonId) => api.delete(`/lessons/${lessonId}`);
