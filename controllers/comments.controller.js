import db from "../models/index.js";

// Access the User and Comment models from the Sequelize database instance
const User = db.users;
const Comment = db.comments;

/**
 * Create a new comment on a post.
 *
 * This function handles the creation of a new comment by an authenticated user.
 * It requires the content of the comment and the ID of the post being commented on,
 * which are extracted from the request body. The userId is obtained from the
 * authenticated user session.
 *
 * @param {Object} req - The request object containing the comment data.
 * @param {Object} res - The response object.
 */
export const createComment = async (req, res) => {
  const { content, postId } = req.body;
  try {
    // Create and save the new comment in the database
    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id, // Associate the comment with the logged-in user
    });
    res.json(comment); // Respond with the created comment data
  } catch (err) {
    // Handle any errors during comment creation
    res.status(500).send({
      message: err.message || "Some error occurred while creating the comment.",
    });
  }
};

/**
 * Find all comments made by the authenticated user.
 *
 * This function retrieves all comments created by the currently authenticated user.
 * It demonstrates how to perform a query based on the user ID from the user session
 * and includes user details in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const findCommentsByUser = async (req, res) => {
  try {
    // Retrieve all comments by the logged-in user
    const comments = await Comment.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"], // Include user details in the response
        },
      ],
    });
    res.json(comments); // Respond with the user's comments
  } catch (err) {
    // Handle any errors during the retrieval process
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving comments.",
    });
  }
};

/**
 * Delete a specific comment.
 *
 * This function allows an authenticated user to delete one of their comments,
 * identified by the comment ID. It ensures that only the owner of the comment
 * can delete it, providing an authorization check.
 *
 * @param {Object} req - The request object, containing the comment ID.
 * @param {Object} res - The response object.
 */
export const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the comment by ID
    const comment = await Comment.findByPk(id);
    // Check if the logged-in user is the owner of the comment
    if (comment.userId !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized!" });
    }
    // Delete the comment from the database
    await comment.destroy();
    res.send({ message: "Comment was deleted successfully." });
  } catch (err) {
    // Handle any errors during the deletion process
    res
      .status(500)
      .send({ message: err.message || "Could not delete the comment." });
  }
};
