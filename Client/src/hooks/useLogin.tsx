import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginInputs {
    username: string;
    password: string;
}

const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async (inputs: LoginInputs) => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/login", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json();
            if (!res.ok) {
                return toast.error(data.message);
            }
            else {
                toast.success(data.message);
                setAuthUser(data);
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading,login }
}

export default useLogin;