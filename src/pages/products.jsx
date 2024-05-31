import { Helmet } from "react-helmet-async";
import { ProductsView } from "../components/Products/view";
import { useTranslation } from "react-i18next";
const ProductsPage = () => {
  const {t} = useTranslation('global')
  return (
    <>
      <Helmet>
        <title>{t("helmet.shop")}</title>
      </Helmet>

      <ProductsView/>
    </>
  );
};

export default ProductsPage 
