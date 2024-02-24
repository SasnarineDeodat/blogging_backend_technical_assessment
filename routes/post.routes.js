import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createPost,
  findPostsByEmail,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const postRouter = (app) => {
  const router = express.Router();

  // Route to create a new post. Requires user authentication.
  router.post("/", isAuthenticated, createPost);

  // Route to retrieve posts by a user's email. This route does not require authentication.
  router.get("/by-email/:email", findPostsByEmail);

  // Route to update an existing post. Requires user authentication and that the user owns the post.
  router.put("/:id", isAuthenticated, updatePost);

  // Route to delete an existing post. Requires user authentication and that the user owns the post.
  router.delete("/:id", isAuthenticated, deletePost);

  // Register the router with the application under the '/api/posts' path.
  app.use("/api/posts", router);
};

export default postRouter;
