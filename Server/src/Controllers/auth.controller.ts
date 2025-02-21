import { Request, Response } from "express";
import zod from 'zod';
import client from "../db/prisma";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

// const blockedTokens = new Set<string>();

const loginSchema = zod.object({
    username: zod.string({ message: "username required!" }),
    password: zod.string({ message: "password required!" })
})
export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(403).json({
                message: "invalid request",
                errors: parsed.error.errors.map(error => error.message)
            })
        }
        const { username, password } = req.body;
        const user = await client.user.findFirst({
            where: {
                username
            }
        })
        if (!user) return res.status(400).json({
            message: "username or password incorrect!"
        })
        const matchPassword = comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "username or password incorrect!"
            })
        }
        const token = generateToken({ username, id: user.id });
        res.cookie("token","Bearer "+token,{
            sameSite:'strict',
            httpOnly:true,
            secure:process.env.NODE_ENV !== "development",
            maxAge: 15 * 24 * 60 * 60 * 1000
        });
        // res.setHeader('Authorization', "Bearer "+token);
        return res.status(200).json({
            message: "logged in successfully",
            fullname:user.fullname,
            id:user.id,
            profilePic:user.profilePic,
            gender:user.gender
        })
    } catch (error) {
        console.log('error in login ' + error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const signupSchema = zod.object({
    username: zod.string().min(4, { message: "username should atleast be of 4 characters" }),
    password: zod.string().min(4, { message: "password should atleast be of 4 characters" }),
    fullname: zod.string({ message: "fullname required" }),
    gender: zod.enum(["male", "female", "others"], { message: "gender required or invalid" })
})
export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(403).json({
                message: "invalid request",
                errors: parsed.error.errors.map(error => error.message)
            })
        }

        const { username, password, fullname, gender } = req.body;
        const existingUser = await client.user.findFirst({
            where: {
                username
            }
        })
        if (existingUser) return res.status(403).json({
            message: "user with that username already exists"
        })

        const hashedPassword = hashPassword(password);
        const user = await client.user.create({
            data: {
                username,
                fullname,
                password: hashedPassword,
                gender,
                profilePic: gender == 'male' ?
                    "https://avatar.iran.liara.run/public/boy?username=" + username :
                    "https://avatar.iran.liara.run/public/girl?username=" + username
            }
        })
        const token = generateToken({ username: user.username, id: user.id });

        res.cookie("token","Bearer "+token,{
            sameSite:'strict',
            httpOnly:true,
            secure:process.env.NODE_ENV !== "development",
            maxAge: 15 * 24 * 60 * 60 * 1000
        });
        // res.setHeader('Authorization','Bearer '+token);
        return res.status(201).json({
            message: 'signed up succesfully',
            fullname:user.fullname,
            id:user.id,
            profilePic:user.profilePic,
            gender:user.gender
        })
    } catch (error) {
        console.log('error in signup' + error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
    // blockedTokens.add(req.headers['authorization'] as string);
    res.clearCookie('token');
    return res.status(200).json({
        message: "logged out successfully"
    })
}

export const getMe = async (req:Request,res:Response):Promise<any>=>{
    try {
        // const user = await client.user.findUnique({
        //     where:{
        //         id:req.user.id
        //     }
        // })
    } catch (error) {
        console.log('error in getMe ' + error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}