import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import orderReducer from './features/orders/orderSlice';
import snackbarReducer from './features/snackbar/snackbarSlice';
import orderFormReducer from './features/orderForm/orderFormSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    snackbar: snackbarReducer,
    orderForm: orderFormReducer,
  },
});
