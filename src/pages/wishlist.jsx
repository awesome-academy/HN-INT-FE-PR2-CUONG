import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { WishList } from "../components/Wishlist/view";

const WishlistPage = () => {
  const {t} = useTranslation('global')
  return (
    <>
      <Helmet>
        <title>{t("helmet.wishlist")}</title>
      </Helmet>

      <WishList/>
    </>
  );
};

export default WishlistPage 
