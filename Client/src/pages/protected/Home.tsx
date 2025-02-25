import Conversation from "../../components/messages/Conversation";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-100/20 backdrop-opacity-80 backdrop-blur-lg'>
			<Sidebar />
			<Conversation />
		</div>
	);
};
export default Home;