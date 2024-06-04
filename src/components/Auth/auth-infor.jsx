import { useTranslation } from "react-i18next"
import logo from "../../assets/logo.png"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { RiImageAddLine } from "react-icons/ri";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

import { createUserData } from "../../services/user";
import { apiRemoveImage, apiUploadImage } from "../../services/images";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { toastAuthOption } from "../../utils/toastify";


const AuthInfor = ({ userData, login }) => {

    const { t } = useTranslation("global")

    const schema = z.object({
        phone: z.string().min(10, t("profile.phone-err")).max(11, t("profile.phone-err")),
        gender: z.string().min(1, t("profile.gender-err")),
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema)
    })

    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImage = async (event) => {
        const uploadFile = event.target.files[0]
        if (!uploadFile) {
            return
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('image', uploadFile)
        const response = await apiUploadImage(formData)
        setImage(response)
        setLoading(false)
    }

    const handleRemoveImage = async () => {
        setImage(null)
        await apiRemoveImage(image?.publicId)
    }

    const handleProfile = async (data) => {
        data = { ...data, ...userData, profileImg: image?.img || "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1715076914/avatars/1_zriyqx.jpg", createdAt: Date.now(), updatedAt: Date.now()}
        await createUserData(data)
        toast.success(t("user-success"), toastAuthOption)
        login()
    }

    return (
        <div className="w-full h-full flex justify-center md:items-center 2xl:px-[5%]">
            <div className="w-full max-w-[40rem] flex flex-col md:space-y-6 space-y-3 justify-start">
                <div className="max-h-[3.5rem] overflow-hidden w-full">
                    <img className="w-[10rem] max-h-[5rem] scale-[1.2]  overflow-hidden" src={logo} alt="" />
                </div>
                <div className="flex flex-col space-y-3">
                    <h1 className="font-bold md:text-4xl text-xl">{t("profile.title")}</h1>
                    <h2 className="md:text-xl text-sm font-medium opacity-70">{t("profile.subtitle")}</h2>
                </div>

                <div className="flex flex-col space-y-3">
                    <p className="md:text-xl space-x-2 font-bold">{t("profile.photo")}</p>
                    {image ?
                        (<div className="max-w-[10rem] max-h-[10rem] relative">
                            <IoCloseOutline className="w-[2rem] h-[2rem] absolute right-0 top-0 cursor-pointer"
                                onClick={handleRemoveImage}
                            />
                            <img className="w-full max-w-[10rem] max-h-[10rem] h-full object-cover object-center rounded-[50%]"
                                src={image?.img} alt="null" />
                        </div>) :
                        (loading ? <div className="w-[10rem] h-[10rem] flex justify-center items-center"><Loading /></div> : <div className="flex flex-col relative h-[10rem] space-y-2 justify-center items-center w-[12rem] px-2 py-4 border-dashed border-2">
                            <RiImageAddLine className="w-[3rem] h-[3rem]" />
                            <p className="text-lg font-bold opacity-50">{t("profile.choose")}</p>
                            <input type="file" accept="image/*" onChange={handleImage}
                                className="cursor-pointer h-full w-full absolute inset-0 opacity-0 z-10" />
                        </div>)}

                </div>

                <div className="flex flex-col space-y-3">
                    <p className="md:text-xl space-x-2 font-bold">{t("profile.phone")} <span className="text-[red]">*</span></p>
                    <input type="text"
                        className="border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg"
                        placeholder={t("profile.phone-ex")}
                        {...register("phone")}
                        onChange={(e) => setValue("phone", e.target.value)}
                    />
                    {errors?.phone && <p className="text-[red] md:text-lg">{errors?.phone.message}</p>}
                </div>

                <div className="flex flex-col space-y-3">
                    <p className="md:text-xl space-x-2 font-bold">{t("profile.gender")} <span className="text-[red]">*</span></p>
                    <select
                        className="border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg opacity-60"
                        {...register("gender")}
                        onChange={(e) => setValue("gender", e.target.value)}
                    >
                        <option value="">{t("profile.gender-ex")}</option>
                        <option value="male">{t("profile.male")}</option>
                        <option value="female">{t("profile.female")}</option>
                    </select>
                    {errors?.gender && <p className="text-[red] md:text-lg">{errors?.gender.message}</p>}
                </div>


                <button
                    className="w-full bg-[rgb(62,24,0)] md:py-4 py-2
                         text-white md:text-lg font-bold"
                    onClick={handleSubmit(handleProfile)}
                >{t('profile.button')}
                </button>

            </div>
        </div>
    )
}

export default AuthInfor
