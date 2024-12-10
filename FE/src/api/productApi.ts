import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';
import { CategotyData, ProductFormData } from '../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: customBaseQuery, 
  endpoints: (builder) => ({
    getCategories: builder.query<CategotyData[], void>({
      query: () => ({
        url: '/products/categories',
        method: 'GET',
      }),
    }),

    // Tạo sản phẩm mới
    createProduct: builder.mutation<ProductFormData, ProductFormData>({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        data,
      }),
    }),

    // Lấy tất cả sản phẩm
    getAllProducts: builder.query<ProductFormData[], void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),

    // Lấy chi tiết sản phẩm theo ID
    getProductById: builder.query<ProductFormData, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),

    // Cập nhật sản phẩm theo ID
    updateProduct: builder.mutation<ProductFormData, { id: string; data: ProductFormData }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        data,
      }),
    }),

    // Xóa sản phẩm theo ID
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetCategoriesQuery,
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;