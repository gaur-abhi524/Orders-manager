/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  type: 'new-order',
  formData: {
    id: 1,
    customer_name: '',
    customer_email: '',
    product: 'Product 1',
    quantity: 1,
  },
};

const orderFormSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openForm: (state, { payload }) => {
      state.open = true;
      state.type = payload.type;
      state.formData.id = payload.formData.id;
      state.formData.customer_name = payload.formData.customer_name;
      state.formData.customer_email = payload.formData.customer_email;
      state.formData.product = payload.formData.product;
      state.formData.quantity = payload.formData.quantity;
    },
    closeForm: (state) => {
      state.open = false;
    },
  },
});

export const { openForm, closeForm } = orderFormSlice.actions;

export default orderFormSlice.reducer;
