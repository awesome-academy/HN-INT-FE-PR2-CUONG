import axios from "axios";

const locationUrl = import.meta.env.VITE_LOCATION_URL

const locationAPI = axios.create({
    baseURL: locationUrl + "/api/province",
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})

export const apiGetCity = async () => {
    try{
        const response = await locationAPI.get('/')
        return response?.data?.results
    }
    catch(error){
        return error
    }
}

export const apiGetDistrict = async (cityId) => {
    try{
        const response = await locationAPI.get('/district/'+cityId)
        return response?.data?.results
    }
    catch(error){
        return error
    }
}

export const apiGetWards = async (districtId) => {
    try{
        const response = await locationAPI.get('/ward/'+districtId)
        return response?.data?.results
    }
    catch(error){
        return error
    }
}

