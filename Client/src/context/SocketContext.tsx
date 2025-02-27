import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import io,{Socket} from 'socket.io-client';
import { useAuthContext } from "./AuthContext";

interface ISocketContext {
    onlineUsers:string[],
    socket:Socket|null
}

const SocketContext = createContext<ISocketContext|null>(null);


export const useSocketContext = ()=>{
    const context =  useContext(SocketContext);
    if(context) return context
    else throw new Error("useSocketContext must be used in a SocketContextProvider");
}

const socketUrl = import.meta.env.MODE==="development" ? "http://localhost:3000":"/"

export const SocketContextProvider = ({children}:{children:ReactNode})=>{
    const socketRef = useRef<Socket|null>(null);
    const [onlineUsers,setOnlineUsers]=useState<string[]>([])
    const {authUser,isLoading} = useAuthContext();
    
    useEffect(()=>{
        if(authUser && !isLoading){
            const socket = io(socketUrl,{
                query:{
                    userId:String(authUser.id)
                },
            })
            socketRef.current = socket;
            socket.on("getOnlineUsers",(users:string[])=>{
                setOnlineUsers(users);
            });
            return () => {
                socket.close();
                socketRef.current=null;
            }
        }else if(!authUser && !isLoading){
            if(socketRef.current) socketRef.current.close()
        }
    },[authUser,isLoading])

    return (
        <SocketContext.Provider value={{onlineUsers,socket:socketRef.current}}>
            {children}
        </SocketContext.Provider>
    )
}