import { create } from "zustand"
import { createUserAddress, getUserAddress, getUserData, removeUserAddress, removeUserData, updateUserData } from "../services/user"

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
        const response = await updateUserData(data)
        if(response?.success == "true"){
            await useUserStorage.getState().fetchUserData();
        } 
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

}))
