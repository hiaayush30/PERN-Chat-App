import { LogOut } from "lucide-react";
import {toast} from 'react-toastify';
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
	const {setAuthUser} = useAuthContext();
	const logout = async () => {
		const res = await fetch('/api/auth/logout', {
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
