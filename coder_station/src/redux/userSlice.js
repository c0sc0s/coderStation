import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "user",
  initialState: {
    isLogin: true,
    userInfo: {},
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    }
  }
}).reducer;