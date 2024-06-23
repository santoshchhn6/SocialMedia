import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Like", LikeSchema);
