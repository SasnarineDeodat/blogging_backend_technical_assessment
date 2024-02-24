import db from "../models/index.js";

const { Comment, User } = db;

// Create a new comment
export const createComment = async (req, res) => {
  const { content, postId } = req.body;
  try {
    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id,
    });
    res.json(comment);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the comment.",
    });
  }
};
