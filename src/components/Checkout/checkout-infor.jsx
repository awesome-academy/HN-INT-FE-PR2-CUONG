import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useEffect, memo } from 'react';
import { useLocation } from '../../states/location';
import { FaArrowRight, FaTrash } from 'react-icons/fa6';
import { useUserStorage } from '../../states/user';


const CheckOutInformation = ({nextStep, setInformation}) => {
    const { t } = useTranslation("global")

    const { cities, fetchCity, district, fetchDistrict, wards, fetchWard} = useLocation()
    useEffect(() => {
        fetchCity()
    }, [])

    const {user, address, fetchUserAddress} = useUserStorage()
    useEffect(() => {
        if(user){
            fetchUserAddress(user?.id)
        }
    }, [])


    const schema = z
        .object({
            name: z.string().min(4, t("checkout.address.required-name")),
            phone: z.string().min(10, t("checkout.address.required-phone")).max(11, t("checkout.address.required-phone")),
            city: z.string().min(1, t("checkout.address.required-city")),
            district: z.string().min(1, t("checkout.address.required-district")),
            ward: z.string().min(1, t("checkout.address.required-ward")),
            address: z.string().min(1, t("checkout.address.required-deliver")),
            note: z.string()
        })

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    })

    const handleAddress = (address) => {
        setValue("name", user?.name)
        setValue("phone", user?.phone)
        setValue("city", address.city);
        fetchDistrict(address.city)
        setValue("ward", address.ward);
        setValue("district", address.district);
        setValue("address", address.street);
    }   

    const handleNextStep = (data) => {
        setInformation(data)
        nextStep()
    }

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-2xl w-full flex flex-col md:px-0 px-2 space-y-3">
            {Array.isArray(address) && address?.map((item, index) => (
                <div key={index} className="cursor-pointer flex flex-row justify-between items-center border-2 md:p-4 p-2"
                    onClick={() => handleAddress(item)}
                >
                    <div className="flex flex-col md:space-y-3 space-y-1">
                        <p className="md:text-xl font-semibold">{user?.name} - {user?.phone}</p>
                        <div
                            className="md:text-base text-sm w-full 
                            opacity-70 flex flex-row space-x-2
                            sm:max-w-none max-w-[270px] text-wrap
                        "
                        >
                            {item?.street}, {item?.ward}, {item?.district}, {item?.city}
                        </div>
                    </div>
                </div>
            ))}
                {/* name & phone */}
                <div className='flex sm:flex-row flex-col justify-between w-full sm:space-y-0 space-y-3'>

                    <div className='sm:w-[45%] w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.name")}
                            <span className='text-[red] text-2xl'> * </span>
                        </p>
                        <input type="text" placeholder={t("checkout.address.ex-name")}
                            className='border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2'
                            {...register("name")}
                            onChange={(e) => {
                                setValue("name", e.target.value)
                            }}
                        />
                        {errors.name && <span className='text-[red] sm:text-xl'>{errors?.name?.message}</span>}
                    </div>

                    <div className='sm:w-[45%] w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.phone")}
                            <span className='text-[red] text-2xl'> * </span>
                        </p>
                        <input type="text" placeholder={t("checkout.address.ex-phone")}
                            className='border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2'
                            {...register("phone")}
                            onChange={(e) => {
                                setValue("phone", e.target.value)
                            }}
                        />
                        {errors.phone && <span className='text-[red] sm:text-xl'>{errors?.phone?.message}</span>}
                    </div>
                </div>

                {/* city & district & ward */}

                <div className='flex md:flex-row flex-col justify-between w-full md:space-y-0 space-y-3 md:space-x-4 space-x-0'>

                    <div className='md:w-1/3 w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.city")}
                            <span className='text-[red] text-2xl'> * </span>
                        </p>
                        <select
                            className='border-2 w-full my-2 sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2'
                            {...register("city")}
                            onChange={(e) => {
                                setValue("city", e.target.value)
                                const provinceId = e.target.options[e.target.selectedIndex].dataset.provinceId;
                                fetchDistrict(provinceId)
                            }}
                        >
                            <option value="">{getValues("city") || t("checkout.address.ex-city")}</option>
                            {cities.map((city) => (
                                <option value={city?.province_name} data-province-id={city?.province_id}>
                                    {city?.province_name}
                                </option>
                            ))}
                        </select>
                        {errors.city && <span className='text-[red] sm:text-xl'>{errors?.city?.message}</span>}
                    </div>


                    <div className='md:w-1/3 w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.district")}
                            <span className='text-[red] text-2xl'> * </span>
                        </p>
                        <select
                            className='border-2 w-full my-2 sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2'
                            {...register("district")}
                            onChange={(e) => {
                                setValue("district", e.target.value)
                                const districtId = e.target.options[e.target.selectedIndex].dataset.districtId;
                                fetchWard(districtId)
                            }}
                        >
                            <option value={getValues("district")} >{getValues("district") || t("checkout.address.ex-district")}</option>
                            {getValues("city") && district.map((item) => (
                                <option value={item?.district_name}  data-district-id={item?.district_id}>{item?.district_name}</option>
                            ))}
                        </select>
                        {errors.district && <span className='text-[red] sm:text-xl'>{errors?.district?.message}</span>}
                    </div>
                        
                    <div className='md:w-1/3 w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.ward")}
                            <span className='text-[red] text-2xl'> * </span>
                        </p>
                        <select
                            className='border-2 w-full my-2 sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2'
                            {...register("ward")}
                            onChange={(e) => {
                                setValue("ward", e.target.value)
                            }}
                        >
                            <option value={getValues("ward")}>{getValues("ward") || t("checkout.address.ex-ward")}</option>
                            {getValues("district") && getValues("city") && wards.map((item) => (
                                <option value={item?.ward_name}>{item?.ward_name}</option>
                            ))}
                        </select>
                        {errors.ward && <span className='text-[red] text-xl'>{errors?.ward?.message}</span>}
                    </div>
                </div>

                <div className='w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.deliver")}
                            <span className='text-[red] text-2xl'> * </span>
                        </p>
                        <input type="text" placeholder={t("checkout.address.ex-deliver")}
                            className='border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2'
                            {...register("address")}
                            onChange={(e) => {
                                setValue("address", e.target.value)
                            }}
                        />
                        {errors.address && <span className='text-[red] text-xl'>{errors?.address?.message}</span>}
                </div>

                <div className='w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.note")}
                        </p>
                        <input type="text" placeholder={t("checkout.address.ex-note")}
                            className='border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2'
                            {...register("note")}
                            onChange={(e) => {
                                setValue("note", e.target.value)
                            }}
                        />
                </div>


                <button className='bg-[rgb(62,24,0)] md:w-fit mx-auto flex flex-row items-center justify-center
                 text-white md:min-w-[25rem] w-full px-4 sm:py-5 py-3 h-fit sm:text-xl font-bold'
                    onClick={handleSubmit(handleNextStep)}
                >
                    {t("checkout.step2")}
                    <FaArrowRight className='mt-1 ml-2'/>
                </button>
            </div>
        </div>
    )
}

export default memo(CheckOutInformation)
