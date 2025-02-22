import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import client from "../db/prisma";

interface DecodedToken extends JwtPayload {
    id: number;
    username: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user: {
            username: string;
            id: number;
            fullname: string | null;
            profilePic: string | null;
            gender: string | null;
            conversationIds:Array<number>
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token: string = req.cookies['token'];
    if (!token) return res.status(403).json({
        message: 'token not found'
    })

    const jwtString = token.split(' ')[1];
    if (!jwtString) return res.status(403).json({
        message: 'invalid token'
    })
    try {
        const decoded = jwt.verify(jwtString, process.env.JWT_SECRET as string) as DecodedToken;
        const user = await client.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                username: true,
                profilePic: true,
                id: true,
                fullname: true,
                gender: true,
                conversationIds:true
            }
        })
        if (!user) {
            return res.status(400).json({
                message: 'user not found'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'invalid token'
        })
    }
}