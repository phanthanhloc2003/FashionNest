import { BaseQueryFn } from '@reduxjs/toolkit/query';
import apiClient from './axios'; 

const customBaseQuery: BaseQueryFn<
  { url: string; method: string; data?: any; params?: any },
  unknown,
  unknown
> = async ({ url, method, data, params }) => {
  try {
    const result = await apiClient({
      url,
      method,
      data,
      params,
      withCredentials: true, 
    });
    return { data: result.data }; 
  } catch (axiosError) {
    const err = axiosError as any;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export default customBaseQuery;