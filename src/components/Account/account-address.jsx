import { useTranslation } from "react-i18next"
import { FaTrash } from "react-icons/fa6"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { memo, useEffect } from "react"
import { useLocation } from "../../states/location";
import { useUserStorage } from "../../states/user";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";

const NewAddress = ({ name, phone, userId }) => {

    const { t } = useTranslation("global")
    const { cities, fetchCity, district, fetchDistrict, wards, fetchWard } = useLocation()
    const { createUserAddress } = useUserStorage()

    useEffect(() => {
        fetchCity()
    }, [])

    const schema = z
        .object({
            city: z.string().min(1, t("checkout.address.required-city")),
            district: z.string().min(1, t("checkout.address.required-district")),
            ward: z.string().min(1, t("checkout.address.required-ward")),
            address: z.string().min(1, t("checkout.address.required-deliver")),
        })

        const defaultFormValues = {
            city: '', 
            district: '', 
            ward: '', 
            address: ''
        };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        getValues,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultFormValues,
            name: name,
            phone: phone
        }
    })

    const handleNewAddress = async (data) => {
        const payload = {
            user_id: userId,
            city: data?.city,
            district: data?.district,
            ward: data?.ward,
            street: data?.address
        }
        await createUserAddress(payload)
        reset(defaultFormValues);
        toast.success(t("account.address-success"), toastOption)
    }

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-2xl w-full flex flex-col lg:px-0 sm:px-2 space-y-3">

                <p className="sm:text-2xl text-lg font-bold">{t("account.address-title")}</p>

                {/* name & phone */}
                <div className='flex sm:flex-row flex-col justify-between w-full sm:space-y-0 space-y-3'>
                    <div className='sm:w-[45%] w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.name")}
                            <span className='text-[red] sm:text-2xl'> * </span>
                        </p>
                        <input type="text" placeholder={t("checkout.address.ex-name")}
                            className='border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2'
                            value={name}
                            disabled
                        />
                    </div>

                    <div className='sm:w-[45%] w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.phone")}
                            <span className='text-[red] sm:text-2xl'> * </span>
                        </p>
                        <input type="text" placeholder={t("checkout.address.ex-phone")}
                            className='border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2 my-2'
                            value={phone}
                            disabled
                        />
                    </div>
                </div>

                {/* city & district & ward */}

                <div className='flex md:flex-row flex-col justify-between w-full md:space-y-0 space-y-3 md:space-x-4 space-x-0'>

                    <div className='md:w-1/3 w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.city")}
                            <span className='text-[red] sm:text-2xl'> * </span>
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
                            <option value="">{t("checkout.address.ex-city")}</option>
                            {cities?.map((city, index) => (
                                <option key={index} value={city?.province_name} data-province-id={city?.province_id}>
                                    {city?.province_name}
                                </option>
                            ))}
                        </select>
                        {errors.city && <span className='text-[red] text-xl'>{errors?.city?.message}</span>}
                    </div>


                    <div className='md:w-1/3 w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.district")}
                            <span className='text-[red] sm:text-2xl'> * </span>
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
                            <option value="">{t("checkout.address.ex-district")}</option>
                            {getValues("city") && district.map((item, index) => (
                                <option key={index} value={item?.district_name} data-district-id={item?.district_id}>{item?.district_name}</option>
                            ))}
                        </select>
                        {errors.district && <span className='text-[red] text-xl'>{errors?.district?.message}</span>}
                    </div>

                    <div className='md:w-1/3 w-full'>
                        <p className='sm:text-xl font-semibold '>
                            {t("checkout.address.ward")}
                            <span className='text-[red] sm:text-2xl'> * </span>
                        </p>
                        <select
                            className='border-2 w-full my-2 sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2'
                            {...register("ward")}
                            onChange={(e) => {
                                setValue("ward", e.target.value)
                            }}
                        >
                            <option value="">{t("checkout.address.ex-ward")}</option>
                            {getValues("district") && getValues("city") && wards.map((item, index) => (
                                <option key={index} value={item?.ward_name}>{item?.ward_name}</option>
                            ))}
                        </select>
                        {errors.ward && <span className='text-[red] text-xl'>{errors?.ward?.message}</span>}
                    </div>
                </div>

                <div className='w-full'>
                    <p className='sm:text-xl font-semibold '>
                        {t("checkout.address.deliver")}
                        <span className='text-[red] sm:text-2xl'> * </span>
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

                <button
                    className="md:w-[15rem] w-full bg-[rgb(62,24,0)] sm:py-4 py-3
                         text-white md:text-lg font-bold"
                    onClick={handleSubmit(handleNewAddress)}
                >{t('account.address-btn')}
                </button>

            </div>
        </div>
    )
}

const AccountAddress = ({ name, phone, id }) => {

    const { address, fetchUserAddress } = useUserStorage()
    useEffect(() => {
        fetchUserAddress(id)
    }, [])

    const { t } = useTranslation("global")
    const {removeUserAddress} = useUserStorage()


    const handleRemoveAddress = async (addressId) => {
        await removeUserAddress(addressId, id)
        toast.success(t("account.address-delete"), toastOption)
    }

    return (
        <div className="w-full space-y-6">
            {Array.isArray(address) && address?.map((item, index) => (
                <div key={index} className="flex flex-row justify-between items-center border-2 md:p-4 p-2">
                    <div className="flex flex-col md:space-y-3 space-y-1">
                        <p className="md:text-xl font-semibold">{name} - {phone}</p>
                        <div
                            className="md:text-base text-sm w-full 
                            opacity-70 flex flex-row space-x-2
                            sm:max-w-none max-w-[270px] text-wrap
                        "
                        >
                            {item?.street}, {item?.ward}, {item?.district}, {item?.city}
                        </div>
                    </div>

                    <div className="rounded-[50%] bg-[rgb(62,24,0)] md:p-3 p-2" onClick={() => handleRemoveAddress(item?._id)}>
                        <FaTrash className="md:w-[20px] md:h-[20px] text-white" />
                    </div>

                </div>
            ))}
            <NewAddress name={name} phone={phone} userId={id} />
        </div>
    )
}

export default memo(AccountAddress)
