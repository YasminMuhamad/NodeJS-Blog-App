import express from 'express';

import userRouter from './modules/users/userRouter.js';
import postRouter from './modules/posts/postRouter.js';
import commentRoutes from './modules/comments/commentRouter.js';
const app = express();

// Middleware
app.use(express.json());

// Register Routers
app.use( userRouter);
app.use( postRouter);
app.use(commentRoutes);


app.get('/', (req, res) => {
  res.send('NodeJS Group Project API');
});

export default app;
