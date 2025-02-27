import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation, { MessageType } from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, addMessage } = useConversation();
    
    useEffect(() => {
        const handleNewMessage = (newMessage: MessageType) => {
            if (newMessage.senderId === selectedConversation?.id) {
                addMessage(newMessage); 
            }
        };
        socket?.on("newMessage", handleNewMessage)
        return () => {
            socket?.removeListener("newMessage")
        }
    }, [socket,selectedConversation])
}

export default useListenMessages;