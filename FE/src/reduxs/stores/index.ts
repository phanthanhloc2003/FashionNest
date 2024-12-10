import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { adminApi } from '../../api/adminApi';
import { productApi } from '../../api/productApi';

// Cấu hình store
export const store = configureStore({
  reducer: {
    // Thêm reducer của RTK Query
    [adminApi.reducerPath]: adminApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware, productApi.middleware),
});

// Thiết lập các listeners (optional)
setupListeners(store.dispatch);

// Xuất type để sử dụng cho Redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;