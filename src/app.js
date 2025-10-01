import express from 'express';

// import userRouter from './modules/users/userRouter.js';
import postRouter from './modules/posts/postRouter.js';
// import commentRouter from './modules/comments/commentRouter.js';

const app = express();

// Middleware
app.use(express.json());

// Register Routers
// app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
// app.use('/api/comments', commentRouter);

app.get('/', (req, res) => {
  res.send('NodeJS Group Project API');
});

export default app;
