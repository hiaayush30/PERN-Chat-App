import { Loader, Send } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import useCurrentConversations from "../../zustand/useCurrentConversations";

const MessageInput = () => {
	const { selectedConversation,addMessage } = useConversation();
	const { setCurrentConversations, currentConversations } = useCurrentConversations();
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (text.trim().length == 0) {
			return toast.error('message cannot be empty!');
		}
		setLoading(true);
		try {
			const response = await fetch(import.meta.env.VITE_BE_DOMAIN + '/api/message/send/' + selectedConversation?.id, {
				method: "POST",
				credentials: 'include',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: text.trim() })
			});
			const data = await response.json();
			if (!response.ok) {
				return toast.error('message could not be sent!')
			} else {
				addMessage(data);
				
				if (!selectedConversation) return;
				const existingConversation = currentConversations.find(conversation => conversation.id === selectedConversation.id)
				if (!existingConversation) {
					setCurrentConversations([{
						fullname: selectedConversation?.fullname,
						gender: selectedConversation?.gender,
						id: selectedConversation?.id,
						profilePic: selectedConversation?.profilePic,
						username: selectedConversation?.username
					}, ...currentConversations])
				}
				
			}
		} catch (error) {
			console.log(error);
			toast.error('something went wrong!')
		} finally {
			setText('');
			setLoading(false);
		}
	}
	return (
		<form onSubmit={handleSubmit}
			className='px-4 mb-3 '>
			<div className='w-full relative'>
				<input
					value={text} onChange={e => setText(e.target.value)}
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
				/>
				<button disabled={loading}
					type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{!loading && <Send className='w-6 h-6 text-white' />}
					{loading && <Loader />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
