import {Server} from 'socket.io';

import http from 'http';
import express from 'express';

const app = express();
// This will handle HTTP routes

const server = http.createServer(app);
// This allows Express and WebSockets (Socket.IO) to share the same server.
const io = new Server(server,{  
    // Creates a Socket.IO WebSocket server and binds it to the HTTP server.
    cors:{
        origin:process.env.FE_DOMAIN,
        credentials:true
    }
});


const userSocketMap:Record<string,string> = {}  //{userId:socketId}
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId as string;
    if(userId){
        userSocketMap[userId] = socket.id;
    }
})