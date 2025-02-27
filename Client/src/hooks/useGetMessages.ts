import { useState } from "react"
import { toast } from "react-toastify";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const getMessages = async (id: number) => {
        try {
            setLoading(true);
            const res = await fetch('/api/message/' + id, {
                credentials: 'include'
            });
            const data = await res.json();
            if (!res.ok) {
                return [];
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
    return { loading, getMessages }
}

export default useGetMessages;