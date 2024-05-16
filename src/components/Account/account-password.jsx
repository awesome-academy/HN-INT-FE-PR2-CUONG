import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";


const AccountPassword = () => {

    const { t } = useTranslation("global")

    const [hiddenPassword, setHideenPassword] = useState(true)
    const [hiddenPassword1, setHideenPassword1] = useState(true)

    const schema = z.object({
        password: z.string().min(6, t("login.password-err")),
        confirm: z.string().min(6, t("login.password-err")),
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema)
    })

    return (
        <div className="flex flex-col space-y-6 sm:w-1/2">
            <div className="space-y-3">
                <p className="md:text-xl space-x-2 font-bold">{t("account.psw.current")} <span className="text-[red]">*</span></p>
                <div className="flex flex-row items-center justify-between relative">
                    <input type={hiddenPassword ? "password" : "text"}
                        className="w-full md:h-[4rem] h-[3rem]  px-4 border-2 md:text-lg "
                        placeholder={t("login.password-ex")}
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
            </div>

            <div className="space-y-3">
                <div className="space-y-1">
                    <p className="md:text-xl space-x-2 font-bold">{t("account.psw.new")} <span className="text-[red]">*</span></p>
                    <div className="flex flex-row items-center justify-between relative">
                        <input type={hiddenPassword1 ? "password" : "text"}
                            className="w-full md:h-[4rem] h-[3rem]  px-4 border-2 md:text-lg "
                            placeholder={t("login.password-ex")}
                        />
                        {hiddenPassword1 ?
                            (<FaRegEye className="w-[1.5rem] h-[1.5rem] cursor-pointer absolute right-4 text-[rgb(62,24,0)] "
                                onClick={() => setHideenPassword1(!hiddenPassword1)}
                            />) :
                            (<FaRegEyeSlash className="w-[1.5rem] h-[1.5rem] cursor-pointer absolute right-4 text-[rgb(62,24,0)] text-lg"
                                onClick={() => setHideenPassword1(!hiddenPassword1)}
                            />)
                        }
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="md:text-xl space-x-2 font-bold">{t("account.psw.confirm")} <span className="text-[red]">*</span></p>
                    <div className="flex flex-row items-center justify-between relative">
                        <input type={hiddenPassword1 ? "password" : "text"}
                            className="w-full md:h-[4rem] h-[3rem]  px-4 border-2 md:text-lg "
                            placeholder={t("login.password-ex")}
                        />
                    </div>
                </div>
            </div>


            <button
                className="md:w-[15rem] w-full bg-[rgb(62,24,0)] sm:py-4 py-3
                         text-white md:text-lg font-bold"
            >{t('account.psw.btn')}
            </button>             
        </div>
    )
}

export default AccountPassword
