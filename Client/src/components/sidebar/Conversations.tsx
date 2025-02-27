import { useEffect } from "react";
import useGetConversation from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import Loader from "../Loader";
import useSearchUsers from "../../zustand/useSearchUsers";
import useCurrentConversations from "../../zustand/useCurrentConversations";

const Conversations = () => {
	const {currentConversations,setCurrentConversations} = useCurrentConversations();
	const { loading, getConversations } = useGetConversation();
	const { users, isSearching } = useSearchUsers();
	useEffect(() => {
		const fetchConversations = async () => {
			const response = await getConversations();
			setCurrentConversations(response);
		}
		fetchConversations();
	}, [])
	if (loading) return <div className="flex justify-center"><Loader /></div>
	return (
		<div className={`${isSearching && 'bg-gray-800 rounded-md'} py-2 flex flex-col overflow-auto`}>
			{!isSearching && currentConversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
			{isSearching && users.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
		</div>
	);
};
export default Conversations;
