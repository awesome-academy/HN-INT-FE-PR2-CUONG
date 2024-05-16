import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import notFoundImg from "../assets/notfound.svg"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const {t} = useTranslation("global")
    const navigate = useNavigate()
    return (
        <>
            <Helmet>
                <title>404</title>
            </Helmet>
            <div className="w-full flex justify-center">
                <div className="max-w-screen-2xl text-center h-screen space-y-8 flex flex-col justify-center items-center">
                    <img src={logo} className="w-[10rem] h-[5rem]" alt="" />
                    <p className="text-[26px] font-bold">{t("notfound")}</p>
                    <p className="max-w-[30rem] text-[rgb(99,115,129)]">{t("notfound-sub")}</p>
                    <img src={notFoundImg} alt="" />
                    <button className="bg-[rgb(62,24,0)] text-white w-[20rem] sm:py-4 py-2 font-bold"
                        onClick={() => navigate("/")}
                    >
                        {t("nfbtn")}
                    </button>
                </div>

            </div>
        </>
    )
}

export default NotFound
