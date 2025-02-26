import { create } from "zustand"

export type UserType = {
	id: number;
	username: string;
	profilePic: string;
	fullname: string;
	gender: string;
}

interface Users {
  users:UserType[],
  setUsers:(users:UserType[])=>void;
  isSearching:boolean;
  setIsSearching:(searching:boolean)=>void;
}

const useSearchUsers = create<Users>((set) => ({
    users: [],
    setUsers: (users) => set({ users:users }),
	isSearching:false,
	setIsSearching:(searching=>set({isSearching:searching})),
}))

export default useSearchUsers