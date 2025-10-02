import postCollection from "../../database/models/postModel.js";


// Create Post
export const createNewPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).send("Unauthorized: User ID missing");
    }

    const creator = req.user.id; 
    const createdAt = new Date().toISOString();

    const newPostRef = await postCollection.add({
      title,
      content,
      imageUrl,
      creator,
      createdAt,
    });

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

    snapshot.forEach((doc) => {
      const data = doc.data();
  
      if (req.user.role === "admin" || data.creator === req.user.id) {
        posts.push({ id: doc.id, ...data });
      }
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};


// Update Post
export const updatePost = async (req, res) => {
  try {
    const postRef = postCollection.doc(req.params.id);
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
    res.status(500).send("Internal Server Error");
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const postRef = postCollection.doc(req.params.id);
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
    res.status(500).send("Internal Server Error");
  }
};
