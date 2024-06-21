import Post from "../Models/PostModel.js";

export const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Post.countDocuments();

    if (posts.length === 0) {
      res.status(200).json({ message: "no posts" });
    } else {
      res.status(200).json({
        success: true,
        posts,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
    // res.status(500).json(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { userId, title } = req.body;
    // console.log(req.file);
    const newPost = { userId, title, image: req.file.filename, likes: 0 };
    await Post.create(newPost);

    res.status(200).json({
      message: "Post created",
      success: true,
      post: newPost,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const id = req.params.id;

    let likes = 1;
    const post = await Post.findById(id);
    if (post) likes = post.likes + 1;
    await Post.findByIdAndUpdate(id, { likes });

    res.status(200).json({
      message: "like added",
      success: true,
      likes,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Post.findByIdAndDelete(id);

    res.status(200).json({
      message: "Post Deleted",
      success: true,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};
