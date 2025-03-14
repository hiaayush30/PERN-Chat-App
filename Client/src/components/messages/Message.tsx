import { useAuthContext } from "../../context/AuthContext";
import useConversation, { MessageType } from "../../zustand/useConversation";

const Message = ({ message }: { message?: MessageType }) => {
	const { authUser } = useAuthContext();
	const {selectedConversation} = useConversation();
	const fromMe = message?.senderId == authUser?.id;
	const myMessage = fromMe ? "chat-end" : "chat-start";
	const img = fromMe
		? authUser?.profilePic
		: selectedConversation?.profilePic;

	const bubbleBg = fromMe ? "bg-blue-500" : "";
	const shakeClass = message?.shouldShake ? "shake":"";
	return (
		<div className={`chat ${myMessage}`}>
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 md:w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={img} />
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md
				${shakeClass}`}>{message?.content}</p>
			<span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{new Date(message?.createdAt as Date).toLocaleTimeString()}</span>
		</div>
	);
};
export default Message;
