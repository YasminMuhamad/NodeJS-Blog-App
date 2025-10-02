import { Router } from "express";

import { login, getProfile, register, updateProfile, deleteUser } from "./userController.js"; 
import { validateUser } from "../../middlewares/validateUser.js";
import checkEmail from "../../middlewares/checkEmail.js";
import verifyToken from "../../middlewares/verifyToken.js";

const userRouter = Router();

userRouter.post('/register', validateUser('register'), checkEmail('register'), register);
userRouter.post('/login', validateUser('login'), checkEmail('login'), login);
userRouter.get('/profile/:id', verifyToken, getProfile);
userRouter.put('/profile/:id', verifyToken, validateUser('update'), checkEmail('update'), updateProfile);
userRouter.delete('/profile/:id', verifyToken, deleteUser);


export default userRouter;