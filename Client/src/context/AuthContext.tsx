import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface AuthUserType {
    id: number;
    fullname: string;
    email: string;
    profilePic: string;
    gender: "male" | "female";
}

const AuthContext = createContext<{   //this helps in type hints while consuming context 
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => { },
    isLoading: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = (props: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchUser = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BE_DOMAIN + '/api/auth/me');
                const data = await res.json()
                if (!res.ok) {
                    return alert(data.message)
                }
            } catch (error) { 
                console.log(error);
            }finally{
                setIsLoading(false)
            }
        }
        fetchUser();
    }, [])

    return <AuthContext.Provider value={{
        authUser,
        setAuthUser,
        isLoading,
    }}>
        {props.children}
    </AuthContext.Provider >
}