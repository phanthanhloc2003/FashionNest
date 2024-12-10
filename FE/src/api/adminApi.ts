import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';
import { User } from '../types/auth';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
     // Lấy tất cả người dùng
     getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    deleteUser: builder.mutation({
      query: (phone: string) => ({
        url: `/users/user-delete/${phone}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }: { userId: string; userData: any }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        data: userData,
      }),
    }),
    getUserById: builder.query({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = adminApi;