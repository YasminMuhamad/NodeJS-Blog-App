import { Router } from "express";

import { login, getProfile, register, updateProfile, deleteUser } from "./userController.js"; 
import { validateUser } from "../../middlewares/validateUser.js";
import checkEmail from "../../middlewares/checkEmail.js";
import verifyToken from "../../middlewares/verifyToken.js";

const userRouter = Router();

userRouter.post('/api/users/register', validateUser('register'), checkEmail('register'), register);
userRouter.post('/api/users/login', validateUser('login'), checkEmail('login'), login);
userRouter.get('/api/users/profile/:id', verifyToken, getProfile);
userRouter.put('/api/users/profile/:id', verifyToken, validateUser('update'), checkEmail('update'), updateProfile);
userRouter.delete('/api/users/profile/:id', verifyToken, deleteUser);


export default userRouter;