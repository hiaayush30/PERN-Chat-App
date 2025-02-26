import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import authRouter from './Routes/auth.route';
import messageRouter from './Routes/message.route';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.FE_DOMAIN,
    credentials:true
    // allows cookies, authentication headers, and TLS client certificates to be sent between the
    // frontend and backend in cross-origin requests.
}))
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/message",messageRouter);

app.listen(process.env.PORT,()=>{
    console.log('server running on port '+ process.env.PORT);
})