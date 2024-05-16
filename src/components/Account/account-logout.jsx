import { useTranslation } from "react-i18next"
import { useUserStorage } from "../../states/user"
import { toast } from "react-toastify"
import { toastOption } from "../../utils/toastify"

const AccountLogout = () => {

    const { t } = useTranslation("global")

    const {handleLogout} = useUserStorage()

    const handleLogoutUser = () => {
        handleLogout()
        toast.success(t("account.logout.toast"), toastOption)
    }

    return (
        <div className="w-full">
            <p className="font-bold sm: text-2xl">{t("account.logout.title")}</p>
            <p className="sm:text-base text-sm font-medium opacity-75 mt-2 mb-6">{t("account.logout.subtitle")}</p>

            <button
                className="md:w-[15rem] w-full bg-[rgb(62,24,0)] sm:py-4 py-3
                         text-white md:text-lg font-bold"
                onClick={handleLogoutUser}
            >{t('account.logout.btn')}
            </button>

        </div>
    )
}

export default AccountLogout
