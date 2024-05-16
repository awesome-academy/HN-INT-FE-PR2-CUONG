import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { AccountView } from "../components/Account/view";

const AccountPage = () => {

    const { t } = useTranslation("global")

    return(
        <>
            <Helmet>
                <title>{t("helmet.account")}</title>
            </Helmet>

            <AccountView/>
        </>
    )
}

export default AccountPage
