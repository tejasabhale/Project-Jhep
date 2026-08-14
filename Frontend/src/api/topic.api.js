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

export const updateTopic = async (topicId, payload) => {
  const { data } = await api.patch(`/topics/${topicId}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteTopic = async (topicId) => {
  const { data } = await api.delete(`/topics/${topicId}`);
  return data;
};
