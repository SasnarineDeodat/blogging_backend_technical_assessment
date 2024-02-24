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

  router.post("/", isAuthenticated, createPost);
  router.get("/by-email/:email", findPostsByEmail);
  router.put("/:id", isAuthenticated, updatePost);
  router.delete("/:id", isAuthenticated, deletePost);

  app.use("/api/posts", router);
};

export default postRouter;
