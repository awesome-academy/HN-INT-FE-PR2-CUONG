import { useTranslation } from "react-i18next"
import PageTitle from "../../Page-Title"
import MainWishList from "../main-wishlist"
import HomePolicy from "../../Home/home-policy"

const WishList = () => {
  const {t} = useTranslation("global")
  return (
    <section className="pb-4">
     <PageTitle title={t("page-title.wishlist")} subtitle={t("page-title.wishlist-sub")}/>
     <MainWishList/>
     <HomePolicy/>
    </section>
  )
}

export default WishList
