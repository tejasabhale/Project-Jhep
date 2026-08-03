import api from "./axios";

export const createQuiz = async (lessonId, data) => {
  const response = await api.post(`/quizzes/${lessonId}`, data);
  return response.data;
};

export const getQuizByLesson = async (lessonId) => {
  const response = await api.get(`/quizzes/${lessonId}`);
  return response.data;
};

export const updateQuiz = async (lessonId, data) => {
  const response = await api.patch(`/quizzes/${lessonId}`, data);
  return response.data;
};

export const deleteQuiz = async (lessonId) => {
  const response = await api.delete(`/quizzes/${lessonId}`);
  return response.data;
};
