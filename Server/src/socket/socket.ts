import {Server, Socket} from 'socket.io';

import http from 'http';
import express from 'express';

const app = express();
// This will handle HTTP routes
app.use(express.json())

const server = http.createServer(app);
// This allows Express and WebSockets (Socket.IO) to share the same server.
const io = new Server(server,{  
    // Creates a Socket.IO WebSocket server and binds it to the HTTP server.
    cors:{ //for added security for websocket server 
        origin:process.env.FE_DOMAIN,
        credentials:true
    }
});

const userSocketMap:{[key:string]:string}= {}  //{userId:socketId}

export const getRecieverSocketId = (recieverId:string)=> {
    return userSocketMap[recieverId]
};

io.on("connection",(socket:Socket)=>{
    console.log("new user connected:"+socket.id);
    const userId = socket.handshake.query.userId as string;
    if(userId){
        userSocketMap[userId] = socket.id;
    }
  
    //io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("user:"+socket.id+" disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {app,io,server}