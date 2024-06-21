import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
} from "../Controllers/PostsController.js";
import { tokenVarification } from "../Middlewares/TokenVarification.js";
import { addComment, getComments } from "../Controllers/CommentController.js";
import { upload } from "../util/uploadImage.js";

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/createPost",
  tokenVarification,
  upload.single("image"),
  createPost
);

router.put("/likePost/:id", likePost);
router.post("/addComment/:id", addComment);
router.get("/getComments", getComments);
router.delete("/delete/:id", tokenVarification, deletePost);

export default router;
