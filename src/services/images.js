import axios from "axios"

const imgUrl = import.meta.env.VITE_BASE_URL_SERVER

const imgAPI = axios.create({
    baseURL: imgUrl + '/api/v1',
    withCredentials: false,
    headers: {
        'Content-Type' : 'multipart/form-data',
        'Access-Control-Allow-Origin' : 'true',
    }
})

export const apiUploadImage = async(data) => {
    try{
        const response = await imgAPI.post('/images', data)
        return response?.data?.data
    }
    catch(error){
        return error
    }
}

export const apiRemoveImage = async (imgID) => {
    try{
        const response = await imgAPI.delete(`/images/${imgID}`)
        return response?.data
    }
    catch(error){
        return error
    }
}
