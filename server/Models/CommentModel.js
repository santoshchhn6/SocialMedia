import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  auther: { type: String, required: true },
  comment: { type: String, required: true },
  date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Comment", CommentSchema);
