import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
} from "../Controllers/PostsController.js";
import { tokenVarification } from "../Middlewares/TokenVarification.js";
import { addComment, getComments } from "../Controllers/CommentController.js";
import { upload } from "../util/uploadImage.js";
import { addLike, getLike } from "../Controllers/LikeController.js";

const router = express.Router();

router.post(
  "/createPost",
  tokenVarification,
  upload.single("image"),
  createPost
);
router.delete("/delete/:id", tokenVarification, deletePost);
router.get("/", getPosts);

router.post("/likePost/", addLike);
router.get("/getLike/", getLike);

router.post("/addComment/", addComment);
router.get("/getComments", getComments);

export default router;
