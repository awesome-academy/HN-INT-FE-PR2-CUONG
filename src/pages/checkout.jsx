import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { CheckOutView } from "../components/Checkout/view";

const CheckOutPage = () => {
    const {t} = useTranslation('global')
    return(
        <>
            <Helmet>
                <title>{t("helmet.checkout")}</title>
            </Helmet>
            
            <CheckOutView/>
        </>
    )
}

export default CheckOutPage
