import db from "../models/index.js";

const { Post, User } = db;

// Create a new post
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      userId: req.user.id,
    });
    res.json(post);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the post.",
    });
  }
};
