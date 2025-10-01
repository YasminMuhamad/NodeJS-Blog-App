import postCollection from "../Database/mpostModel.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../dbConnection.js";

// Create Post
export const createNewPost = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const creator = req.myToken.id; // جاي من التوكن
  const createdAt = new Date().toISOString();

  const newPost = await postCollection.add({ title, content, imageUrl, creator, createdAt });
  res.status(201).json({ msg: "Post Created", newPost });
};

//  Get All Posts
export const getAllPosts = async (req, res) => {
  const snapshot = await postCollection.get();
  const posts = [];
  snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
  res.status(200).send(posts);
};

// Update Post (Authorization logic)
export const updatePost = async (req, res) => {
  try {
    const postRef = doc(db, "posts", req.params.id);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) return res.status(404).send("Post not found");

    const postData = postSnap.data();

    // Authorization check
    if (req.myToken.role !== "admin" && postData.creator !== req.myToken.id) {
      return res.status(403).send("Not allowed to update this post");
    }

    await updateDoc(postRef, req.body);
    res.status(200).send("Post Updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//  Delete Post (Authorization logic)
export const deletePost = async (req, res) => {
  try {
    const postRef = doc(db, "posts", req.params.id);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) return res.status(404).send("Post not found");

    const postData = postSnap.data();

    // Authorization check
    if (req.myToken.role !== "admin" && postData.creator !== req.myToken.id) {
      return res.status(403).send("Not allowed to delete this post");
    }

    await deleteDoc(postRef);
    res.status(200).send("Post Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
