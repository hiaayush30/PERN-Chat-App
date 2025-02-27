import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SignupInputs {
    fullname: string;
    username: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

const useSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const signup = async (inputs: SignupInputs) => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
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
    return { loading, signup }
}

export default useSignup;