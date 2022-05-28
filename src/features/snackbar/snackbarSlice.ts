import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  msg: '',
  severity: 'info',
};

const snackbarSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openSnackbar: (state, { payload }) => {
      state.open = true;
      state.msg = payload.msg;
      state.severity = payload.severity;
    },
    closeSnackbar: (state) => {
      state.open = false;
      state.msg = '';
      state.severity = 'info';
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
