import { useTranslation } from "react-i18next"
import logo from "../../assets/logo.png"
import gg from "../../assets/slide/google.png"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"
import { toastAuthOption, toastOption } from "../../utils/toastify"
import { useNavigate } from "react-router-dom"
import { handleLoginAccount } from "../../services/auth"


const AuthLogin = ({signup}) => {

    const { t } = useTranslation("global")
    const [hiddenPassword, setHideenPassword] = useState(true)

    const schema = z.object({
        email: z.string().email(t("login.email-err")),
        password: z.string().min(6, t("login.password-err")),
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
      } = useForm({
        resolver: zodResolver(schema)
    })

    const navigate = useNavigate()

    const handleLogin = async (data) => {
        const response = await handleLoginAccount(data)
        if(response.success == true){
            toast.success(response.message, toastOption)
            sessionStorage.setItem("account_id", JSON.stringify(response?.account_id))
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
        else {
            toast.warning(response.message, toastOption)
        }
    }

    return (
        <div className="w-full h-full flex justify-center md:items-center 2xl:px-[5%]">
            <div className="w-full max-w-[40rem] flex flex-col md:space-y-6 space-y-3 justify-start">
                <div className="max-h-[3.5rem] overflow-hidden w-full">
                    <img className="w-[10rem] max-h-[5rem] scale-[1.2]  overflow-hidden" src={logo} alt="" />
                </div>
                <div className="flex flex-col space-y-3">
                    <h1 className="font-bold md:text-4xl text-xl">{t("login.title")}</h1>
                    <h2 className="md:text-xl text-sm font-medium opacity-70">{t("login.title-sub")}</h2>
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

                <p className="underline cursor-pointer text-[rgb(62,24,0)] md:text-lg font-bold w-full text-right">{t("login.forgot")}</p>

                <button 
                    className="w-full bg-[rgb(62,24,0)] md:py-4 py-2
                         text-white md:text-lg font-bold"
                    onClick={handleSubmit(handleLogin)}
                        >{t('login.title')}
                </button>

                <div className="flex flex-row items-center">
                    <div className="flex-grow h-[2px] bg-[rgb(230,230,230)]"></div>
                    <p className="text-center px-2 md:text-lg font-medium opacity-70">{t("login.or")}</p>
                    <div className="flex-grow h-[2px] bg-[rgb(230,230,230)]"></div>
                </div>

                <div className="cursor-pointer border-2 flex flex-row items-center justify-center md:h-[3.5rem] h-[3rem] space-x-4">
                    <img className="bg-transparent h-[2rem] w-[2rem]" src={gg} alt="" />
                    <span className="md:text-lg font-medium">{t("login.gg")}</span>
                </div>

                <p className="w-full text-center md:text-lg font-semibold">{t("login.dont")} 
                    <span className="cursor-pointer  underline ml-2 text-[rgb(62,24,0)]" onClick={signup}>{t("login.signup")}</span>
                </p>

            </div>
        </div>
    )
}

export default AuthLogin
