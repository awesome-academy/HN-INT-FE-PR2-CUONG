import { useTranslation } from "react-i18next"
import accountImg from "../assets/account.png"
import { Link } from "react-router-dom" 

const RequiredView = () => {
    const {t} = useTranslation("global")
    return(
        <div className="flex justify-center">
            <div className="w-full max-w-screen-2xl min-h-[30rem] 
            flex flex-col justify-center items-center">
                <img src={accountImg} className="w-[20rem]" />
                <h1 className="md:text-3xl mt-4 mb-6 md:px-0 px-2 text-xl font-bold text-center">{t("account.required")}</h1>
                <Link to='/auth'>
                    <button className="bg-[rgb(62,24,0)] p-4 text-white font-bold
                            min-w-[20rem]
                    ">
                        {t('account.login')}
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default RequiredView
