import api from "./axios";

export const getAllTopics = async (params = {}) => {
  const { data } = await api.get("/topics", {
    params,
  });
  return data;
};

export const getTopicById = async (topicId) => {
  const { data } = await api.get(`/topics/${topicId}`);
  return data;
};

export const createTopic = async (payload) => {
  const { data } = await api.post("/topics", payload);
  return data;
};

export const updateTopic = async (topicId, data) => {
  const response = await api.patch(`/topics/${topicId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteTopic = async (topicId) => {
  const { data } = await api.delete(`/topics/${topicId}`);
  return data;
};
