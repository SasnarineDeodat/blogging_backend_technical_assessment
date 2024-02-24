import db from "../models/index.js";

// Access the User and Post models from the Sequelize database instance
const User = db.users;
const Post = db.posts;

/**
 * Create a new blog post.
 *
 * This function handles the creation of a new blog post by an authenticated user.
 * It requires the title and content of the post, which are extracted from the request body.
 * The userId is obtained from the authenticated user session.
 *
 * @param {Object} req - The request object containing the post data.
 * @param {Object} res - The response object.
 */
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    // Create and save the new post in the database
    const post = await Post.create({
      title,
      content,
      userId: req.user.id, // Associate the post with the logged-in user
    });
    res.json(post); // Respond with the created post data
  } catch (err) {
    // Handle any errors during post creation
    res.status(500).send({
      message: err.message || "Some error occurred while creating the post.",
    });
  }
};

/**
 * Find all posts by a user's email.
 *
 * This function retrieves all blog posts created by a user, identified by their email.
 * It demonstrates how to perform a query based on associated user data.
 *
 * @param {Object} req - The request object, containing the user's email as a parameter.
 * @param {Object} res - The response object.
 */
export const findPostsByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    // Retrieve all posts by the found user
    const posts = await Post.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"], // Include user details in the response
        },
      ],
    });
    res.json(posts); // Respond with the user's posts
  } catch (err) {
    // Handle any errors during the retrieval process
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

/**
 * Update a blog post.
 *
 * This function allows an authenticated user to update one of their existing blog posts,
 * identified by the post ID. It ensures that only the owner of the post can make updates.
 *
 * @param {Object} req - The request object, containing the new post data and the post ID.
 * @param {Object} res - The response object.
 */
export const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the post by ID
    const post = await Post.findByPk(id);
    // Check if the logged-in user is the owner of the post
    if (post.userId !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized!" });
    }
    // Update the post with the new data
    await post.update(req.body);
    res.send({ message: "Post was updated successfully." });
  } catch (err) {
    // Handle any errors during the update process
    res.status(500).send({
      message: err.message || "Some error occurred while updating the post.",
    });
  }
};

/**
 * Delete a blog post.
 *
 * This function allows an authenticated user to delete one of their blog posts,
 * identified by the post ID. It ensures that only the owner of the post can delete it.
 *
 * @param {Object} req - The request object, containing the post ID.
 * @param {Object} res - The response object.
 */
export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the post by ID
    const post = await Post.findByPk(id);
    // Check if the logged-in user is the owner of the post
    if (post.userId !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized!" });
    }
    // Delete the post from the database
    await post.destroy();
    res.send({ message: "Post was deleted successfully." });
  } catch (err) {
    // Handle any errors during the deletion process
    res
      .status(500)
      .send({ message: err.message || "Could not delete the post." });
  }
};
