// Routes/commentRoutes.js
import { Router } from "express";
import { createComment, getComments, updateComment, deleteComment } from "./commentController.js";
import verifyToken from "../../middlewares/verifyToken.js";

const commentRouter = Router();

commentRouter.post("/comments", verifyToken, createComment);
commentRouter.get("/comments/:postId", verifyToken, getComments);
commentRouter.put("/comments/:id", verifyToken, updateComment);
commentRouter.delete("/comments/:id", verifyToken, deleteComment); 

export default commentRouter;
