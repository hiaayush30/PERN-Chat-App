import { create } from 'zustand';

export type MessageType = {
    id: number;
    content: string;
    senderId: number;
    createdAt: Date,
    updatedAt: Date,
    conversationId: number;
}

export type ConversationType = {
    id: number;
    fullname: string;
    profilePic: string;
    gender: string;
    username: string;
}

interface ConversationState {
    selectedConversation: null | ConversationType;
    messages: MessageType[];
    setSelectedConversation: (conversation: ConversationType | null) => void;
    setMessages: (messages: MessageType[]) => void
    addMessage: (newMessage: MessageType) => void
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set(({ selectedConversation: conversation })),

    messages: [],
    setMessages: (messages) => set({ messages }),

    addMessage: (newMessage) => set((prev) => ({ messages: [...prev.messages, newMessage] }))
}));

export default useConversation;