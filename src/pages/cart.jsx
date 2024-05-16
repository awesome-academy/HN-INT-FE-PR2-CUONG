import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { CartView } from "../components/Cart/view";
const CartPage = () => {

  const { t } = useTranslation("global")
  return (
    <>
      <Helmet>
        <title>{t("helmet.cart")}</title>
      </Helmet>

      <CartView />
    </>
  );
};

export default CartPage;
