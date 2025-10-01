import postCollection from "../../database/models/postModel.js";
import db from "../../database/dbConnection.js";

// Create Post
export const createNewPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const creator = req.user.id;
    const createdAt = new Date().toISOString();

    const newPostRef = await postCollection.add({ title, content, imageUrl, creator, createdAt });
    res.status(201).json({ msg: "Post Created", id: newPostRef.id });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const snapshot = await postCollection.get();
    const posts = [];
    snapshot.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));
    res.status(200).send(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Update Post (Authorization logic)
export const updatePost = async (req, res) => {
  try {
    const postRef = db.collection("posts").doc(req.params.id);
    const postSnap = await postRef.get();

    if (!postSnap.exists) return res.status(404).send("Post not found");

    const postData = postSnap.data();

    // Authorization check
    if (req.user.role !== "admin" && postData.creator !== req.user.id) {
      return res.status(403).send("Not allowed to update this post");
    }

    await postRef.update(req.body);
    res.status(200).send("Post Updated");
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Post (Authorization logic)
export const deletePost = async (req, res) => {
  try {
    const postRef = db.collection("posts").doc(req.params.id);
    const postSnap = await postRef.get();

    if (!postSnap.exists) return res.status(404).send("Post not found");

    const postData = postSnap.data();

    // Authorization check
    if (req.user.role !== "admin" && postData.creator !== req.user.id) {
      return res.status(403).send("Not allowed to delete this post");
    }

    await postRef.delete();
    res.status(200).send("Post Deleted");
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).send("Internal Server Error");
  }
};
