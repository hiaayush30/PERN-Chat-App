import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import authRouter from './Routes/auth.route';
import messageRouter from './Routes/message.route';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();

app.use(cors({
    origin:process.env.FE_DOMAIN
}))
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/message",authMiddleware,messageRouter);

app.listen(process.env.PORT,()=>{
    console.log('server running on port '+ process.env.PORT);
})