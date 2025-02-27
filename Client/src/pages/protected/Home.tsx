import Conversation from "../../components/messages/Conversation";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
	const {authUser} = useAuthContext();
	console.log(authUser);
	return (
		<div className='xl:h-[90vh] max-sm:w-[95vw] flex h-[85vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-100/20 backdrop-opacity-80 backdrop-blur-lg'>
			<Sidebar />
			<Conversation />
		</div>
	);
};
export default Home;