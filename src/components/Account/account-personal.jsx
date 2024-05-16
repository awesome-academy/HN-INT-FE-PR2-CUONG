import { FaEdit } from "react-icons/fa"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { apiUploadImage } from "../../services/images";
import { useState } from "react";
import Loading from "../Loading";
import { updateUserData } from "../../services/user";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";

const AccountPersonal = ({ data }) => {

    const uploadData = data
    const { t } = useTranslation("global")
    const schema = z.object({
        name: z.string().min(2, t("signup.name-err")),
        phone: z.string().min(10, t("profile.phone-err")).max(11, t("profile.phone-err")),
        gender: z.string().min(1, t("profile.gender-err")),
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: data?.name,
            phone: data?.phone,
            gender: data?.gender
        }
    })

    const [image, setImage] = useState(data?.profileImg)
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
        setImage(response?.img)
        setLoading(false)
    }


    const handleUpdate = async (data) => {
        data = {...uploadData, profileImg:image, gender:data.gender, name:data.name,phone:data.phone}
        const { email, password, ...payload } = data;
        const response = await updateUserData(payload)
        toast.success(t("infor-success"), toastOption)
    }


    return (
        <div className="w-full space-y-6">
            {loading
                ? (<div className="w-full h-[10rem] flex justify-center items-center"><Loading /></div>)
                : (
                    <div className="relative max-w-[10rem] w-[10rem] h-[10rem] max-h-[10rem] lg:mx-0 mx-auto">
                        <img className="w-full h-full rounded-[50%]" src={image} alt="avatar" />
                        <div className="w-[3rem] h-[3rem] bg-[rgb(62,24,0)] 
                    absolute bottom-0 right-0 rounded-[50%] border-2 border-white
                    text-white flex items-center justify-center cursor-pointer
                    ">
                            <FaEdit className="h-[1rem] w-[1rem]" />
                            <input type="file" accept="image/*"
                                className="cursor-pointer h-full w-full absolute 
                            inset-0 z-10 opacity-0"
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                )}

            <div className="flex flex-col space-y-3">
                <p className="md:text-xl space-x-2 font-bold">{t("login.email")}</p>
                <input type="text"
                    className="border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg cursor-not-allowed"
                    value={data?.email}
                    disabled
                />
            </div>

            <div className="flex flex-col space-y-3">
                <p className="md:text-xl space-x-2 font-bold">{t("signup.name")} <span className="text-[red]">*</span></p>
                <input type="text"
                    className="border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg"
                    placeholder={t("signup.name-ex")}
                    {...register("name")}
                    onChange={(e) => setValue("name", e.target.value)}
                />
                {errors?.name && <p className="text-[red] md:text-lg">{errors?.name.message}</p>}
            </div>

            <div className="flex md:flex-row flex-col justify-between w-full md:space-x-6 space-x-0 md:space-y-0 space-y-6">
                <div className="flex flex-col space-y-3 md:w-1/2 w-full">
                    <p className="md:text-xl space-x-2 font-bold">{t("profile.phone")} <span className="text-[red]">*</span></p>
                    <input type="text"
                        className="border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg"
                        placeholder={t("profile.phone-ex")}
                        {...register("phone")}
                        onChange={(e) => setValue("phone", e.target.value)}
                    />
                    {errors?.phone && <p className="text-[red] md:text-lg">{errors?.phone.message}</p>}
                </div>

                <div className="flex flex-col space-y-3 md:w-1/2 w-full">
                    <p className="md:text-xl space-x-2 font-bold">{t("profile.gender")} <span className="text-[red]">*</span></p>
                    <select
                        className="border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg opacity-60"
                        {...register("gender")}
                        onChange={(e) => setValue("gender", e.target.value)}
                    >
                        <option value="male">{t("profile.male")}</option>
                        <option value="female">{t("profile.female")}</option>
                    </select>
                    {errors?.gender && <p className="text-[red] md:text-lg">{errors?.gender.message}</p>}
                </div>
            </div>

            <button
                className="md:w-[15rem] w-full bg-[rgb(62,24,0)] sm:py-4 py-3
                         text-white md:text-lg font-bold"
                onClick={handleSubmit(handleUpdate)}
            >{t('account.personal-btn')}
            </button>


        </div>
    )
}

export default AccountPersonal

