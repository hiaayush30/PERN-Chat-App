import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
	const { getMessages, loading } = useGetMessages();
	const { messages, setMessages, selectedConversation } = useConversation();
	const scrollRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const fetchMessages = async () => {
			if (!selectedConversation) return;
			const response = await getMessages(selectedConversation.id);
			setMessages(response);
		}
		fetchMessages();
	}, [selectedConversation])

	useEffect(()=>{
          scrollRef.current?.scrollIntoView({behavior:'smooth'})
	},[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading && <div className="w-full h-full flex flex-col gap-5">
				<MessageSkeleton/>
				<MessageSkeleton/>
				<MessageSkeleton/>
			</div>}
			{!loading && messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
			<div ref={scrollRef} className="h-2"></div>
		</div>
	);
};
export default Messages;
