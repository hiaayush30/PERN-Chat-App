import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import useSearchUsers, { UserType } from "../../zustand/useSearchUsers";
import useGetUsers from "../../hooks/useGetUsers";

const SearchInput = () => {
	const { setUsers, isSearching, setIsSearching } = useSearchUsers();
	const allUsersRef = useRef<UserType[]>([]);
	const [searchText, setSearchText] = useState('');
	const { getUsers } = useGetUsers();
	useEffect(() => {
		const fetchUsers = async () => {
			const response = await getUsers();
			setUsers(response);
			allUsersRef.current=response;
		}
		fetchUsers();
	}, [])

	useEffect(() => {
		console.log(allUsersRef.current)
		const filtered = allUsersRef.current.filter(user => user.fullname.includes(searchText));
		setUsers(filtered);
	}, [setSearchText, searchText])

	const stopSearch = () => {
		setSearchText('');
		setIsSearching(false);
	}
	return (
		<div className='flex items-center gap-2'>
			<input
				onFocus={() => setIsSearching(true)}
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				type='text'
				placeholder='New chat '
				className='input-sm md:input input-bordered rounded-lg sm:rounded-full w-full'
			/>
			<button onClick={()=>{if(isSearching)stopSearch()}}
				className='btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  '>
				{!isSearching && <Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />}
				{isSearching && <ImCross size={10} className='w-4 h-4 md:w-6 md:h-6 outline-none' />}
			</button>
		</div>
	);
};
export default SearchInput;
