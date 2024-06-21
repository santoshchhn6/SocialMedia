import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    resetUser(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser,setToken, resetUser } = userSlice.actions;
export default userSlice;
