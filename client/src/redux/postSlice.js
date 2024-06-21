import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      state.posts = [...state.posts, action.payload];
    },
    removePost(state, action) {
      state.posts = state.posts.filter((e) => e._id != action.payload);
    },
    incrementLikes: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.likes += 1;
      }
    },
  },
});

export const { setPosts, addPost, removePost, incrementLikes } =
  postSlice.actions;
export default postSlice;
