import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation, { MessageType } from "../zustand/useConversation";
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, addMessage } = useConversation();
    
    useEffect(() => {
        const handleNewMessage = (newMessage: MessageType) => {
            if (newMessage.senderId === selectedConversation?.id) {
                newMessage.shouldShake=true;
                const sound = new Audio(notificationSound);
                sound.play();
                addMessage(newMessage); 
            }
        };
        socket?.on("newMessage", handleNewMessage)
        return () => {
            socket?.off("newMessage")
        }
    }, [socket,selectedConversation])
}

export default useListenMessages;