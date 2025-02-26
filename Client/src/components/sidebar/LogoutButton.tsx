import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
	const {setAuthUser} = useAuthContext();
	const navigate = useNavigate();
	const logout = async () => {
		const res = await fetch(import.meta.env.VITE_BE_DOMAIN + '/api/auth/logout', {
			credentials: 'include',
			method: 'POST'
		})
		if (res.ok) {
			toast.info('Logged out successfully!')
			setAuthUser(null);
		} else {
			toast.error('Something went wrong!');
		}
	};

	return (
		<div className='mt-auto'>
			<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		</div>
	);
};
export default LogoutButton;
