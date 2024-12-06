import {
  ProductFormData,
} from "../types/product";
import apiClient from "./axios";

export const ProductApi = {
  getCategoty: async () => {
    const response = await apiClient.get("/products/categories");
    return response.data;
  },
  createProduct: async (data: ProductFormData) => {
    const response = await apiClient.post("/products", data);
    return response.data;
  },

  getAllProduct: async () => {
    const response = await apiClient.get("/products");
    return response.data;
  },
};
