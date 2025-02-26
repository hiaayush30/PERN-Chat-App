import { useState } from "react"
import { toast } from "react-toastify";

const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const getUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(import.meta.env.VITE_BE_DOMAIN + '/api/message/users', {
                credentials: 'include'
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return [];
            } else {
                return data;
            }
        } catch (error) {
            toast.error('Something went wrong!')
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    }
    return {loading,getUsers}
}

export default useGetUsers;