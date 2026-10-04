import api from "./axios";

export const getQuizByLesson = async (lessonId) => {
  const response = await api.get(`/quizzes/lesson/${lessonId}`);
  return response.data;
};

export const getQuizById = async (quizId) => {
  const response = await api.get(`/quizzes/${quizId}`);
  return response.data;
};

export const submitQuiz = async (quizId, answers) => {
  const response = await api.post(`/quizzes/${quizId}/submit`, {
    answers,
  });

  return response.data;
};

export const getQuizzes = async () => {
  const response = await api.get("/quizzes/admin");
  return response.data;
};

export const getQuizByIdAdmin = async (quizId) => {
  const response = await api.get(`/quizzes/admin/${quizId}`);
  return response.data;
};

export const createQuiz = async (data) => {
  const response = await api.post("/quizzes", data);
  return response.data;
};

export const updateQuiz = async (quizId, data) => {
  const response = await api.patch(`/quizzes/${quizId}`, data);
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const response = await api.delete(`/quizzes/${quizId}`);
  return response.data;
};
