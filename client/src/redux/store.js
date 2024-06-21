import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appSlice from "./appSlice";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    app: appSlice.reducer,
    posts: postSlice.reducer,
  },
});

export default store;
