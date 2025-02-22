import { Request, Response } from "express";
import client from "../db/prisma";

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
    const { id: recieverId } = req.params;
    const { content } = req.body;
    if (!content) return res.status(403).json({
        message: "Invalid request,content required"
    })
    try {
        const user = await client.user.findUnique({
            where: {
                id: Number(recieverId)
            }
        })
        if (!user) {
            return res.status(400).json({
                message: 'reciever not found'
            })
        }

        let conversation = await client.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [req.user.id, Number(recieverId)]
                }
            }
        })
        if (!conversation) {
            const newConversation = await client.conversation.create({
                data: {
                    participantIds: [req.user.id, Number(recieverId)],
                }
            });
           
            //add the new conversation id for both users
            await client.user.updateMany({
                where:{
                    id:{
                        in:[req.user.id,Number(recieverId)]
                    }
                },
                data:{
                    conversationIds:{
                        push:newConversation.id
                    }
                }
            })

            const message = await client.message.create({
                data: {
                    content,
                    conversationId: newConversation.id,
                    senderId: req.user.id,
                }
            })
            await client.conversation.update({
                where:{
                    id:newConversation.id
                },
                data:{
                    messages:{
                        connect:{
                            id:message.id
                        }
                    }
                }
            })
            return res.status(201).json(message)
        } else {
            const message = await client.message.create({
                data: {
                    content,
                    conversationId: conversation.id,
                    senderId: req.user.id,
                }
            })
            await client.conversation.update({
                where:{
                    id:conversation.id
                },
                data:{
                    messages:{
                        connect:{
                            id:message.id
                        }
                    }
                }
            })
            //socket io goes here
            return res.status(200).json(message)
        }
    } catch (error) {
        console.log('error in sending message ' + error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const getMessages = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {id} = req.params;
        const conversation = await client.conversation.findFirst({
            where:{
                participantIds:{
                    hasEvery:[req.user.id,Number(id)]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:'asc'
                    }
                }
            }
        })
        if(!conversation){
            return res.status(403).json({
                message:'conversation not found'
            })
        }
        return res.status(200).json(conversation.messages)
    } catch (error) {
        console.log('error in getting messages ' + error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const getConversations = async (req:Request,res:Response):Promise<any>=>{
    try {
        //get only the users who you are talking with
        const users = await client.user.findMany({
            where:{
                conversationIds:{
                    hasSome:req.user?.conversationIds ? req.user.conversationIds : []
                },
                id:{
                    not:req.user.id
                }
            },
            select: {
                id: true,
                username: true,
                profilePic: true,
                fullname: true,
                gender: true,
            }
        })
        return res.status(200).json(users);
    } catch (error) {
        console.log('error in getting conversations ' + error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const getAllUsers = async (req:Request,res:Response):Promise<any>=>{
    try {
        const users = await client.user.findMany({
            where:{
               id:{
                not:req.user.id
               }
            },
            select:{
                id:true,
                profilePic:true,
                fullname:true,
                username:true,
                gender:true
            }
        })
        return res.status(200).json(users);
    } catch (error) {
        console.log('error in getting conversations ' + error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
