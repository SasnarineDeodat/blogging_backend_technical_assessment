import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createPost,
  findPostsByEmail,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createPost);
router.get("/by-email/:email", findPostsByEmail); // No authentication required as per your instructions
router.put("/:id", isAuthenticated, updatePost);
router.delete("/:id", isAuthenticated, deletePost);

export default router;
