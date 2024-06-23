import Comment from "../Models/CommentModel.js";

export const addComment = async (req, res, next) => {
  try {
    const { userId, postId, comment, auther } = req.body;
    await Comment.create({ userId, postId, auther, comment });

    res.status(201).json({
      message: "comment created",
      success: true,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.query;

    const comments = await Comment.find({ postId });

    res.status(201).json({
      success: true,
      comments,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};
