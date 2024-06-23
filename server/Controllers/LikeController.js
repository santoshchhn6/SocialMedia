import Like from "../Models/LikesModel.js";

export const addLike = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;

    const alreadyLiked = await Like.findOne({ userId, postId });
    console.log(alreadyLiked);

    if (!alreadyLiked) {
      const like = await Like.create({ userId, postId });
      const count = await Like.countDocuments({ postId });
      res.status(200).json({
        message: "liked post",
        success: true,
        like,
        count,
      });
    } else {
      const deleteLike = await Like.deleteOne({ userId, postId });
      const count = await Like.countDocuments({ postId });
      res.status(200).json({
        message: "unliked post",
        success: true,
        like: deleteLike,
        count,
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export const getLike = async (req, res, next) => {
  try {
    const { userId, postId } = req.query;

    const like = await Like.findOne({ userId, postId });
    const count = await Like.countDocuments({ postId });

    res.status(200).json({
      success: true,
      like,
      count,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};
