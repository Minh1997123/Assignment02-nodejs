import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    email: "",
  },
  reducers: {
    login: (state, action) => {
      return {
        isLogin: true,
        email: action.payload,
      };
    },
    logout: (state) => {
      return {
        isLogin: false,
        email: "",
      };
    },
  },
});
// auth
export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
