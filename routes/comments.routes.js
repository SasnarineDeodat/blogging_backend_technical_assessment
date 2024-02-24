import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createPost,
  findPostsByEmail,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const userRouter = (app) => {
  const router = express.Router();

  router.post("/", isAuthenticated, createComment);
  router.get("/my-comments", isAuthenticated, findCommentsByUser);
  router.delete("/:id", isAuthenticated, deleteComment);

  app.use("/api/comments", router);
};

export default userRouter;
