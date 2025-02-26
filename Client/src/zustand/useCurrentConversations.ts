import { create } from 'zustand';

export type ConversationType = {
    id: number;
    fullname: string;
    profilePic: string;
    gender: string;
    username: string;
}

interface ConversationState {
    currentConversations: ConversationType[];
    setCurrentConversations: (conversations: ConversationType[] | []) => void;
}

const useCurrentConversations = create<ConversationState>((set) => ({
    currentConversations: [],
    setCurrentConversations: (conversations) => set({ currentConversations: conversations }),
}))

export default useCurrentConversations