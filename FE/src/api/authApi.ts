import { accessToken } from "../types/auth";
import apiClient from "./axios";

export const authApi = {
  login: async (phone: string, password: string) => {
    const response = await apiClient.post(
      "/auth/login",
      { phone, password },
      { withCredentials: true }
    );
    return response.data;
  },

  register: async (data: {
    phone: string;
    password: string;
    fullName: string;
  }) => {
    const response = await apiClient.post("/users/register", data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  role: async () => {
    const response = await apiClient.get("/users/role");
    return response.data;
  },

  refresherToken: async (): Promise<accessToken> => {
    const response = await apiClient.get("/auth/refresh-token", {
      withCredentials: true,
    });
    return response.data;
  },

 
};
