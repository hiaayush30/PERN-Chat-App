import {Router} from 'express';
import { getAllUsers, getConversations, getMessages, sendMessage } from "../Controllers/message.controller";
import { authMiddleware } from '../middleware/auth.middleware';

const messageRouter = Router();

messageRouter.get('/users',authMiddleware, getAllUsers);

//send a  message to the given id
messageRouter.post('/send/:id',authMiddleware, sendMessage);

//all your conversations
messageRouter.get('/conversations',authMiddleware,getConversations)


//get all messages between you and the given id
messageRouter.get('/:id',authMiddleware,getMessages)


export default messageRouter;