import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    }
  }
});

export default userSlice.reducer;
export const { initUserInfo } = userSlice.actions;
export const { changeLoginStatus } = userSlice.actions;