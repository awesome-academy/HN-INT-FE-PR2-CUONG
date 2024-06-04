import { useTranslation } from "react-i18next"
import logo from "../../assets/logo.png"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"
import { toastAuthOption } from "../../utils/toastify"
import { handleRegister } from "../../services/auth"

const AuthSignup = ({ login, infor, userData }) => {

    const { t } = useTranslation("global")
    const [hiddenPassword, setHideenPassword] = useState(true)
    const [confirmButton, setConfirmButton] = useState(false)

    const schema = z.object({
        name: z.string().min(2, t("signup.name-err")),
        email: z.string().email(t("login.email-err")),
        password: z.string().min(6, t("login.password-err")),
        confirm: z.string(),
    })
        .refine(data => data.password == data.confirm, {
            message: t("signup.same"),
            path: ['password']
        })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema)
    })

    const handleSignup = async (data) => {
        if (!confirmButton) {
            toast.warning(t("signup.toast"), toastAuthOption)
            return
        }

        const { name, confirm, ...dataRegister } = data;
        const payload = {...dataRegister, role:"user", createdAt: Date.now(), updatedAt: Date.now()}
        const response = await handleRegister(payload)
        if (response.success == false) {
            toast.error(t("signup-err"), toastAuthOption)
        }
        else {
            const nextData = { account_id: response?.id, name: name }
            toast.success(t("signup-success"), toastAuthOption)
            userData(nextData)
            infor()
        }
    }

    return (
        <div className="w-full h-full flex justify-center md:items-center 2xl:px-[5%]">
            <div className="w-full max-w-[40rem] flex flex-col md:space-y-6 space-y-3 justify-start">
                <div className="max-h-[3.5rem] overflow-hidden w-full">
                    <img className="w-[10rem] max-h-[5rem] scale-[1.2]  overflow-hidden" src={logo} alt="" />
                </div>
                <div className="flex flex-col space-y-3">
                    <h1 className="font-bold md:text-4xl text-xl">{t("signup.title")}</h1>
                    <h2 className="md:text-xl text-sm font-medium opacity-70">{t("signup.title-sub")}</h2>
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

                <div className="flex flex-col space-y-3">
                    <p className="md:text-xl space-x-2 font-bold">{t("login.email")} <span className="text-[red]">*</span></p>
                    <input type="text"
                        className="border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg"
                        placeholder={t("login.email-ex")}
                        {...register("email")}
                        onChange={(e) => setValue("email", e.target.value)}
                    />
                    {errors?.email && <p className="text-[red] md:text-lg">{errors?.email.message}</p>}
                </div>

                <div className="flex flex-col space-y-3">
                    <p className="md:text-xl space-x-2 font-bold">{t("login.password")} <span className="text-[red]">*</span></p>
                    <div className="flex flex-row items-center justify-between relative">
                        <input type={hiddenPassword ? "password" : "text"}
                            className="w-full md:h-[4rem] h-[3rem]  px-4 border-2 md:text-lg "
                            placeholder={t("login.password-ex")}
                            {...register("password")}
                            onChange={(e) => setValue("password", e.target.value)}
                        />
                        {hiddenPassword ?
                            (<FaRegEye className="w-[1.5rem] h-[1.5rem] cursor-pointer absolute right-4 text-[rgb(62,24,0)] "
                                onClick={() => setHideenPassword(!hiddenPassword)}
                            />) :
                            (<FaRegEyeSlash className="w-[1.5rem] h-[1.5rem] cursor-pointer absolute right-4 text-[rgb(62,24,0)] text-lg"
                                onClick={() => setHideenPassword(!hiddenPassword)}
                            />)
                        }
                    </div>
                    {errors?.password && <p className="text-[red] md:text-lg">{errors?.password.message}</p>}
                </div>

                <div className="flex flex-col space-y-3">
                    <p className="md:text-xl space-x-2 font-bold">{t("signup.confirm")} <span className="text-[red]">*</span></p>
                    <div className="flex flex-row items-center justify-between relative">
                        <input type={hiddenPassword ? "password" : "text"}
                            className="w-full md:h-[4rem] h-[3rem]  px-4 border-2 md:text-lg "
                            placeholder={t("login.password-ex")}
                            {...register("confirm")}
                            onChange={(e) => setValue("confirm", e.target.value)}
                        />
                    </div>
                    {errors?.confirm && <p className="text-[red] md:text-lg">{errors?.confirm.message}</p>}
                </div>

                <p className="text-[rgb(62,24,0)] 
                    md:text-lg text-sm font-bold w-full flex flex-row items-center space-x-1 flex-wrap">
                    <input type="checkbox" checked={confirmButton ? true : false} onChange={() => setConfirmButton(!confirmButton)} className="accent-[rgb(62,24,0)] h-4 w-6" />
                    {t("signup.agree")}
                    <span className="underline cursor-pointer md:text-lg text-[12px]">{t("signup.terms")}</span>
                    <span>{t("signup.and")}</span>
                    <span className="cursor-pointer underline md:text-lg text-[12px]">{t("signup.privacy")}</span>
                </p>

                <button
                    className={`w-full ${confirmButton ? "bg-[rgb(62,24,0)]" : "bg-[rgba(62,24,0,0.3)] cursor-not-allowed"} md:py-4 py-2
                         text-white md:text-lg font-bold`}
                    onClick={handleSubmit(handleSignup)}
                >{t('signup.title')}
                </button>

                <p className="w-full text-center md:text-lg font-semibold">{t("signup.already")}
                    <span className="underline cursor-pointer ml-2 text-[rgb(62,24,0)]" onClick={login}>{t("signup.login")}</span>
                </p>

            </div>
        </div>
    )
}

export default AuthSignup
