import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    showCreatePost: false,
  },
  reducers: {
    setShowCreatePost(state, action) {
      state.showCreatePost = action.payload;
    },
  },
});

export const { setShowCreatePost } = appSlice.actions;
export default appSlice;
