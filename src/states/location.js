import {create} from 'zustand'
import { apiGetCity, apiGetDistrict, apiGetWards } from '../services/location'

export const useLocation = create((set) => ({
    cities: [],
    fetchCity: async () => {
        const data = await apiGetCity()
        set({cities: data})
    },

    district: [],
    fetchDistrict: async (cityId) => {
        const data = await apiGetDistrict(cityId)
        set({district: data})
    },
    
    wards: [],
    fetchWard: async (districtId) => {
        const data = await apiGetWards(districtId)
        set({wards: data})
    }

}))