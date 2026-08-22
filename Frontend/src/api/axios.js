import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let waitingRequests = [];

const processWaitingRequests = (error = null) => {
  waitingRequests.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  waitingRequests = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /*
     * These requests should never trigger
     * the access-token refresh flow.
     */
    const skipRefreshUrls = [
      "/auth/session",
      "/auth/refresh-access-token",
      "/auth/login",
      "/auth/register",
      "/auth/verify-otp",
    ];

    const shouldSkipRefresh = skipRefreshUrls.some((url) =>
      originalRequest.url?.includes(url),
    );

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      shouldSkipRefresh
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /*
     * Another request is already refreshing the token.
     * Wait until that request finishes.
     */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        waitingRequests.push({
          resolve,
          reject,
        });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      await refreshApi.post("/auth/refresh-access-token");

      processWaitingRequests();

      return api(originalRequest);
    } catch (refreshError) {
      processWaitingRequests(refreshError);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
