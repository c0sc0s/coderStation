import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    }
  }
}).reducer;