import express from "express";
import { createNewPost, getAllPosts, updatePost, deletePost } from "./postController.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

// Create Post
router.post("/", verifyToken, createNewPost);

// Get All Posts
router.get("/", verifyToken, getAllPosts);

// Update Post
router.put("/:id", verifyToken, updatePost);

// Delete Post
router.delete("/:id", verifyToken, deletePost);

export default router;
