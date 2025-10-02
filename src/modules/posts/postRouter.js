import express from "express";
import { createNewPost, getAllPosts, updatePost, deletePost } from "../posts/postController.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

// Create Post
router.post("/posts",verifyToken, createNewPost);

// Get  Posts
router.get("/posts", verifyToken, getAllPosts);

// Update Post
router.put("/posts/:id", verifyToken, updatePost);

// Delete Post
router.delete("/posts/:id", verifyToken, deletePost);

export default router;
