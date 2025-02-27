import { useState } from "react"
import { toast } from "react-toastify";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const getConversations = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/message/conversations', {
                credentials: 'include'
            });
            const data = await res.json();
            if (!res.ok) {
                return toast.error(data.message);
            } else {
                return data;
            }
        } catch (error) {
            toast.error('Something went wrong!')
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return {loading,getConversations}
}

export default useGetConversation;