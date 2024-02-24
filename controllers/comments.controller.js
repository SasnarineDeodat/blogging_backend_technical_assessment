import db from "../models/index.js";

const User = db.users;
const Comment = db.comments;

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

// Find all comments by the authenticated user
export const findCommentsByUser = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving comments.",
    });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findByPk(id);
    if (comment.userId !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized!" });
    }
    await comment.destroy();
    res.send({ message: "Comment was deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || "Could not delete the comment." });
  }
};
