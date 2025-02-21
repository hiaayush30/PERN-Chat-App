import { Router } from "express";
import { getMe, login, logout, signup } from "../Controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.get('/me',authMiddleware,getMe);

authRouter.post('/login',login);

authRouter.post('/logout',logout);

authRouter.post('/signup',signup);

export default authRouter;