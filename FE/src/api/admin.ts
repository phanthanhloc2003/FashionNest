import { User } from "../types/auth";
import { Product } from "../types/product";
import { Promotion } from "../types/promotion";
import apiClient from "./axios";



export const adminApi = {
  // User Management
  getUsers: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>) => {
    const response = await apiClient.put(`/admin/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Product Management
  getProducts: async () => {
    const response = await apiClient.get('/admin/products');
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await apiClient.get(`/admin/products/${id}`);
    return response.data;
  },

  createProduct: async (data: Omit<Product, 'id'>) => {
    const response = await apiClient.post('/admin/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    const response = await apiClient.put(`/admin/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await apiClient.delete(`/admin/products/${id}`);
    return response.data;
  },

  // Promotion Management
  getPromotions: async () => {
    const response = await apiClient.get('/admin/promotions');
    return response.data;
  },

  getPromotion: async (id: string) => {
    const response = await apiClient.get(`/admin/promotions/${id}`);
    return response.data;
  },

  createPromotion: async (data: Omit<Promotion, 'id'>) => {
    const response = await apiClient.post('/admin/promotions', data);
    return response.data;
  },

  updatePromotion: async (id: string, data: Partial<Promotion>) => {
    const response = await apiClient.put(`/admin/promotions/${id}`, data);
    return response.data;
  },

  deletePromotion: async (id: string) => {
    const response = await apiClient.delete(`/admin/promotions/${id}`);
    return response.data;
  },

  // Product Promotions
  assignPromotionToProduct: async (productId: number, promotionId: number) => {
    const response = await apiClient.post('/admin/product-promotions', { productId, promotionId });
    return response.data;
  },

  removePromotionFromProduct: async (productId: number, promotionId: number) => {
    const response = await apiClient.delete(`/admin/product-promotions/${productId}/${promotionId}`);
    return response.data;
  }
};