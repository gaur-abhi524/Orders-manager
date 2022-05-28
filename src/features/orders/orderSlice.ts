/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import data from '../../DummyData.json';

const initialState = data;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    editItem: (state, { payload }) => {
      const orderItem = state.find((order) => {
        return order.id === payload.id;
      });
      if (orderItem != null) {
        orderItem.customer_name = payload.customer_name;
        orderItem.customer_email = payload.customer_email;
        orderItem.product = payload.product;
        orderItem.quantity = payload.quantity;
      }
    },
    addItem: (state, { payload }) => {
      return (state = [
        ...state,
        {
          id: payload.id,
          customer_name: payload.customer_name,
          customer_email: payload.customer_email,
          product: payload.product,
          quantity: payload.quantity,
        },
      ]);
    },
    deleteItem: (state, { payload }) => {
      return (state = state.filter((order) => {
        return order.id !== payload.id;
      }));
    },
  },
});

export const { editItem, addItem, deleteItem } = orderSlice.actions;

export default orderSlice.reducer;
