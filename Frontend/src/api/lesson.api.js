import api from "./axios";

export const getLessonById = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}`);
  return response.data;
};

export const getLessonsByTopic = async (topicId) => {
  const response = await api.get(`/lessons/topic/${topicId}`);
  return response.data;
};

export const getLessons = async () => {
  const response = await api.get("/lessons");
  return response.data;
};

export const getFeaturedLessons = async () => {
  const response = await api.get("/lessons/featured");
  return response.data;
};

export const toggleFeaturedLesson = async (lessonId) => {
  const response = await api.patch(`/lessons/${lessonId}/featured`);
  return response.data;
};

export const createLesson = async (data) => {
  const response = await api.post("/lessons", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateLesson = async (lessonId, data) => {
  const response = await api.patch(`/lessons/${lessonId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteLesson = async (lessonId) => {
  const response = await api.delete(`/lessons/${lessonId}`);
  return response.data;
};
