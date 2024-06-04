import axios from "axios"

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
        return {...user, email: account.email, password: account.password}
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
