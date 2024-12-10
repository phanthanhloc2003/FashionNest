import axios, { AxiosInstance } from "axios";
import { authApi } from "./authApi";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (config.url !== "/login" && response && response.status === 401) {
      const originalRequest = config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await authApi.refresherToken();
          const { accessToken } = newAccessToken;
          if (accessToken) {
            localStorage.setItem("token", accessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
        }
      }
    }
    console.error("API Error:", response ? response.data : error.message);
    return Promise.reject(error);
  }
);
export default apiClient;
