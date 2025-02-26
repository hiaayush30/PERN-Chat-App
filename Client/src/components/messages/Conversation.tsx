import Logo from "../../assets/Logo";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

// import { MessageCircle } from "lucide-react";

const Conversation = () => {
	const { selectedConversation } = useConversation()
	const { authUser } = useAuthContext();
	return (
		<div className='w-full flex flex-col'>
			<>
				{!selectedConversation &&
					<div className="h-full w-full flex flex-col justify-center items-center">
						<Logo color="white" bgColor="black" size={10} />
						<h1 className="text-xl text-slate-200">👋 Welcome {authUser?.fullname}</h1>
						<h2 className="my-2">Select a chat to start messaging</h2>
					</div>
				}
				{selectedConversation && <>
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
					</div>

					<Messages />
					<MessageInput />
				</>}
			</>
		</div>
	);
};
export default Conversation;
