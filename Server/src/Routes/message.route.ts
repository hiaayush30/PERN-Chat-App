import {Router} from 'express';
import { getConversations, getMessages, sendMessage } from "../Controllers/message.controller";

const messageRouter = Router();

//send a  message to the given id
messageRouter.post('/send/:id',sendMessage);

//all your conversations
messageRouter.get('/conversations',getConversations)

//get all messages between you and the given id
messageRouter.get('/:id',getMessages)

messageRouter.get('/users')

export default messageRouter;