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

// Find all posts by a user's email
export const findPostsByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const posts = await Post.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const id = req.user.id;
  try {
    const post = await Post.findByPk(id);
    if (post.userId !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized!" });
    }
    await post.update(req.body);
    res.send({ message: "Post was updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the post.",
    });
  }
};
