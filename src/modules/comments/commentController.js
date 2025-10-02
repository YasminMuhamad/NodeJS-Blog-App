// Controllers/commentController.js
import commentCollection from "../../database/models/commentModel.js";

// Create Comment
const createComment = async (req, res) => {
  try {
    
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!postId || !content) {
      return res.status(400).send("postId and content are required");
    }

    const newComment = await commentCollection.add({
      postId,
      content,
      userId,
      createdAt: new Date(),
    });

    res.status(201).json({ msg: "Comment Created", id: newComment.id });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// Get Comments for a Post
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const snapshot = await commentCollection.where("postId", "==", postId).get();

    const comments = [];
    snapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// Update Comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const userId = req.user.id;
    const role = req.user.role;

    const doc = await commentCollection.doc(id).get();
    if (!doc.exists) return res.status(404).send("Comment not found");

    const data = doc.data();
    if (data.userId !== userId && role !== "admin") {
      return res.status(403).send("Not allowed");
    }

    await commentCollection.doc(id).update({ content, updatedAt: new Date() });
    res.status(200).send("Comment Updated");
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
  
    const userId = req.user.id;
    const role = req.user.role;

    const doc = await commentCollection.doc(id).get();
    if (!doc.exists) return res.status(404).send("Comment not found");

    const data = doc.data();
    if (data.userId !== userId && role !== "admin") {
      return res.status(403).send("Not allowed");
    }

    await commentCollection.doc(id).delete();
    res.status(200).send("Comment Deleted");
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export { createComment, getComments, updateComment, deleteComment };