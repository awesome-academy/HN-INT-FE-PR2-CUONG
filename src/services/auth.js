import axios from "axios"

const authUrl = import.meta.env.VITE_BASE_URL_SERVER

const authAPI = axios.create({
    baseURL: authUrl,
    headers: {
        'Content-Type' : 'application/json',
    }
})

export const handleRegister = async (data) => {
    try{
        const accountResponse = await authAPI.get("/account")
        const accounts = accountResponse?.data
        const checkEmailExist = accounts.find(account => account.email == data.email)
        if(checkEmailExist){
            return{
                success: false,
                message: "Email is already exist"
            }
        }
        const response = await authAPI.post('/account', data)
        return response?.data
    }
    catch(error){
        return error?.response
    }
}

export const handleLoginAccount = async (data) => {
    try{
        const response = await authAPI.get('/account')
        const accounts = response?.data
        for(let account of accounts){
            if(account.email == data.email){
                if(account.password == data.password){
                    return {
                        success: true,
                        message: "Login successfully",
                        account_id: account.id
                    }
                }else{
                    return{
                        success: false,
                        message: "Password is incorrect"
                    }
                }
            }
        }
        return{
            success: false,
            message: "Account not found"
        }
    }
    catch(error){
        return error?.response.data
    }
}
