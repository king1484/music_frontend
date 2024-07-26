import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${serverUrl}/api/refreshToken`,
          {
            email: localStorage.getItem("email"),
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.error) {
          localStorage.removeItem("email");
          localStorage.removeItem("token");
          window.location.href = "/signin";
        } else {
          const { accessToken } = response.data;
          localStorage.setItem("token", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
