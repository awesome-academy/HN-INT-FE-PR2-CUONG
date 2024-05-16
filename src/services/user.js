import axios from "axios"
import { handleRegister } from "./auth"

const userUrl = import.meta.env.VITE_BASE_URL_SERVER

const userAPI = axios.create({
    baseURL: userUrl,
    headers: {
        'Content-Type' : 'application/json',
    }
})

export const createUserData = async (data) => {
    try{
        console.log(data)
        const response = await userAPI.post('/users', data)
        return response?.data
    }catch(error){
        return error?.response
    }

}

export const getUserData = async (id) => {
    try{
        const account_id = id.trim().replace(/"/g, '');
        const response = await userAPI.get('/users')
        const users = response?.data
        const user = users.find(item => item?.account_id == account_id)
        const account_repsonse = await userAPI.get('/account')
        const accounts = account_repsonse?.data
        const account = accounts.find(item => item?.id == account_id)
        return {...user, email: account.email, password: account.password, role: account.role}
    }
    catch(error){
        return error?.response
    }
}

export const updateUserData = async (data) => {
    try{
        const response = await userAPI.put('/users/'+ data.id, data)
        return response?.data
    }catch(error){
        return error?.response
    }
}

export const removeUserData = async (data) => {
    try{
        const response = await userAPI.delete(`/user/${data.userId}/${data.addressId}`)
        return response?.data
    }catch(error){
        return error?.response
    }
}

// user - address


export const getUserAddress = async(user_id) => {
    try{
        const response = await userAPI.get('/users' + user_id)
        return response?.data
    }
    catch(error){
        return error?.response
    }
} 

export const createUserAddress = async(data) => {
    try{
        const response = await userAPI.post('/user/address', data)
        return response?.data
    }
    catch(error){
        return error?.response
    }
}

export const removeUserAddress = async(id) => {
    try{
        const response = await userAPI.delete('/user/address/'+id)
        return response?.data
    }
    catch(error){
        return error?.response
    }
}

//admin

export const getAllUsers = async() => {
    try{
        const response = await userAPI.get('/users')
        const users = response?.data
        const account_repsonse = await userAPI.get('/account')
        const accounts = account_repsonse?.data
        const usersData = users.map(item => {
            const account = accounts.find(account => account.id == item.account_id)
            return {...item, email: account.email, role: account.role}
        })
        return usersData
    }catch(error){
        return error?.response
    }
}

export const deleteUser = async (user_id, account_id) => {
    try{
        await userAPI.delete('/users/'+user_id)
        await userAPI.delete('/account/'+account_id)
        return response?.data
    }catch(error){
        return error?.response
    }
}

export const createUser = async (data) => {
    try{
        console.log(data)
        const accountResponse = await handleRegister({email:data.email, password:data.password, role:data.role, createdAt: Date.now(), updatedAt: Date.now()})
        if(accountResponse.success == false){
            return {
                success: false,
            }
        }
        const account_id = accountResponse?.id
        await userAPI.post('/users', {account_id: account_id, name: data.name, phone: data.phone, gender: data.gender,
        "profileImg": "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1715076914/avatars/1_zriyqx.jpg", createdAt: Date.now(), updatedAt: Date.now()})
        return {
            success: true
        }
    }catch(error){
        return error?.response
    }
}
