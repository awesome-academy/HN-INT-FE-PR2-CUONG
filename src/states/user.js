import { create } from "zustand"
import { createUser, createUserAddress, deleteUser, getAllUsers, getUserAddress, getUserData, removeUserAddress, removeUserData, updateUserData } from "../services/user"

export const useUserStorage = create((set) => ({

    user: null,

    fetchUserData: async () => {
        const account_id = sessionStorage.getItem('account_id')
        if(!account_id ){
            return
        }
        const data = await getUserData(account_id)
        set({user:data})     
    },

    updateUserData: async (data) => {
        await updateUserData(data)
        await useUserStorage.getState().fetchUserData();
        await useUserStorage.getState().fetchUsersData();
    },

    removeUserData: async (data) => {
        const response = await removeUserData(data)
        if(response?.success == "true"){
            await useUserStorage.getState().fetchUserData();
        }
    },

    handleLogout: () => {
        sessionStorage.clear()
        set({user:null})
    },

    address: [],
    fetchUserAddress: async (user_id) => {
        const data = await getUserAddress(user_id)
        set({address:data?.data})     
    },
    createUserAddress: async (data) => {
        const response = await createUserAddress(data)
        console.log(response);
        if(response?.success == "true"){
            await useUserStorage.getState().fetchUserAddress(data.user_id);
        }
    },
    removeUserAddress: async (address_id, id) => {
        const response = await removeUserAddress(address_id)
        if(response?.success == "true"){
            await useUserStorage.getState().fetchUserAddress(id)
        }
    },

    users: [],
    loading: false,
    toggleLoading: () => set((state) => ({ loading: !state.loading })),

    fetchUsersData: async () => {
        useUserStorage.getState().toggleLoading();
        const response = await getAllUsers();
        set({ users: response});
        useUserStorage.getState().toggleLoading();
    },

    sortUserData: (sortType) => {
        useUserStorage.getState().toggleLoading();
        const sortedUsers = [...useUserStorage.getState().users]
        sortType == "newest"
          ? sortedUsers.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : sortType == "oldest"
          ? sortedUsers.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
          : sortedUsers.sort((a, b) => {
              const nameA = a.name?.charAt(0).toLowerCase();
              const nameB = b.name?.charAt(0).toLowerCase();
              return nameA.localeCompare(nameB);
            });
        set({ users: sortedUsers });
        useUserStorage.getState().toggleLoading();
    },

    searchUser: (keyword) => {
        useUserStorage.getState().toggleLoading();
        const users = useUserStorage.getState().users
        const filteredUsers = users.filter(user => {
          return user.name.toLowerCase().includes(keyword.toLowerCase());
        })
        set({ users: filteredUsers })
        useUserStorage.getState().toggleLoading();
    },

    removeUser: async (user_id, account_id) => {
        useUserStorage.getState().toggleLoading();
        await deleteUser(user_id,account_id);
        await useUserStorage.getState().fetchUsersData();
        useUserStorage.getState().toggleLoading();
    },

    createUser: async(data) => {
        useUserStorage.getState().toggleLoading();
        const response = await createUser(data)
        if (response?.success == true) {
          await useUserStorage.getState().fetchUsersData();
        }
        useUserStorage.getState().toggleLoading();
        return response
    },
}))
