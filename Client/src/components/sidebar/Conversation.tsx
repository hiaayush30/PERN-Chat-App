import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation, { ConversationType } from "../../zustand/useConversation";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
	const { setSelectedConversation, selectedConversation } = useConversation();
	const selected = selectedConversation?.id == conversation.id
	const handleClick = async () => {
		setSelectedConversation(conversation);
	}
	const { onlineUsers } = useSocketContext();
	const [isOnline, setIsOnline] = useState(false);
	useEffect(()=>{
		if (onlineUsers.includes(String(conversation.id))){
			setIsOnline(true);
		}else{
			setIsOnline(false);
		}
	},[onlineUsers,conversation])
	return (
		<>
			<div onClick={handleClick}
				className={`${selected ? 'bg-sky-500' : ''} flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}>
				<div className='avatar online'>
					<div className='w-8 md:w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200 text-sm md:text-md'>{conversation.fullname}</p>
						{/* <span className='text-xl hidden md:inline-block'>{conversation.emoji}</span> */}
					</div>
				</div>
				{isOnline && <span className="h-2 w-2 rounded-full bg-green-400"></span>}
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;
