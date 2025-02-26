import { useAuthContext } from "../context/AuthContext"
import { TbUsersPlus } from "react-icons/tb";

const ProfileOptions = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="absolute top-3 right-3 flex flex-col gap-5">
            <div className="cursor-pointer hover:scale-110 w-12 h-12 rounded-full bg-sky-500">
                <img src={authUser?.profilePic} alt={authUser?.username} />
            </div>
            <div title="New Chat"
            className="cursor-pointer bg-sky-500 hover:scale-110 w-12 h-12 rounded-full flex justify-center items-center">
                <TbUsersPlus size={24} className="text-slate-100" />
            </div>
        </div>
    )
}

export default ProfileOptions
