import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createComment,
  findCommentsByUser,
  deleteComment,
} from "../controllers/comments.controller.js";

const commentRouter = (app) => {
  const router = express.Router();

  // Route to create a new comment on a post. Requires user authentication.
  // The user must be logged in to create a comment.
  router.post("/", isAuthenticated, createComment);

  // Route to retrieve all comments made by the authenticated user.
  // This allows users to see a list of all their comments across posts.
  router.get("/my-comments", isAuthenticated, findCommentsByUser);

  // Route to delete a specific comment. Requires user authentication.
  // Users can only delete their own comments, ensuring user ownership is respected.
  router.delete("/:id", isAuthenticated, deleteComment);

  // Registers the router with the application under the '/api/comments' path.
  // This makes the defined routes accessible under this base path.
  app.use("/api/comments", router);
};

export default commentRouter;
