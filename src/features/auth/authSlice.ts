import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: '',
  profilePicture: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.name = payload.name;
      state.profilePicture = payload.profilePicture;
      state.email = payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = '';
      state.profilePicture = '';
      state.email = '';
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
