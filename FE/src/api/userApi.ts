import apiClient from "./axios";

export const authApi = {
    login: async (phone: string, password: string) => {
      const response = await apiClient.post('/auth/login', { phone, password });
      return response.data;
    },
    
    register: async (data: { phone: string; password: string; fullName: string }) => {
      const response = await apiClient.post('/users/register', data);
      return response.data;
    },
  
    logout: async () => {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    },
  };