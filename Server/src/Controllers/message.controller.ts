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
                participants: {
                    every: {
                        id: {
                            in: [req.user.id, Number(recieverId)]
                        }
                    }
                }
            },
            include: {
                // participants: true  //poulate conversations of the users
            }
        });

        if (!conversation) {
            const newConversation = await client.conversation.create({
                data: {
                    participants: {
                        connect: [
                            { id: req.user.id },
                            { id: Number(recieverId) }
                        ]
                    }
                }
            });
            // connect: [{ id: senderId }, { id: receiverId }] ensures both users are linked as participants.

            const message = await client.message.create({
                data: {
                    content,
                    conversationId: newConversation.id,
                    senderId: req.user.id,
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

export const getMessages = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id: recieverId } = req.params;
 
        // Find the conversation where BOTH req.user.id and recieverId exist
        const conversation = await client.conversation.findFirst({
            where: {  // ie for each conversation
                AND:[  // participants array should have both ids
                    {participants:{
                        some:{
                            id:req.user.id 
                        }
                    }},
                    {participants:{
                        some:{
                            id:Number(recieverId)
                        }
                    }}
                ]
            }
        });

        if (!conversation) {
            return res.status(403).json({
                message: 'Conversation not found'
            });
        }

        // Get messages using the correct conversationId
        const messages = await client.message.findMany({
            where: {
                conversationId: conversation.id  // Use found conversation's ID
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return res.status(200).json(messages);
    } catch (error) {
        console.log('Error in getting messages: ' + error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export const getConversations = async (req: Request, res: Response): Promise<any> => {
    try {
        //get only the users who you are talking with
        const users = await client.user.findMany({
            where: {
                id: {
                    not: req.user.id
                },
                conversations: {
                    some: {
                        participants: {
                            some: {
                                id: req.user.id
                            }
                        }
                    }
                },
            },
            select: {
                id: true,
                username: true,
                profilePic: true,
                fullname: true,
                gender: true,
                conversations: true
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

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await client.user.findMany({
            where: {
                id: {
                    not: req.user.id
                }
            },
            select: {
                id: true,
                profilePic: true,
                fullname: true,
                username: true,
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
