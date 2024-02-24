import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createComment,
  findCommentsByUser,
  deleteComment,
} from "../controllers/comments.controller.js";

const commentRouter = (app) => {
  const router = express.Router();

  router.post("/", isAuthenticated, createComment);
  router.get("/my-comments", isAuthenticated, findCommentsByUser);
  router.delete("/:id", isAuthenticated, deleteComment);

  app.use("/api/comments", router);
};

export default commentRouter;
