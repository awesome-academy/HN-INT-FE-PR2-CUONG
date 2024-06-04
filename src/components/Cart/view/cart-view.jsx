import { useTranslation } from "react-i18next"
import PageTitle from "../../Page-Title"
import MainCart from "../main-cart"
import HomePolicy from "../../Home/home-policy"

const CartView = () => {

    const {t} = useTranslation("global")
    
    return(
        <section className="pb-6 md:space-y-6">
            <PageTitle
             title={t("page-title.cart")}
             subtitle={t("page-title.cart-sub")}
            />
            <MainCart/>
            <HomePolicy/>
        </section>
    )
}

export default CartView
