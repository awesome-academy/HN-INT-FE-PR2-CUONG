import { Helmet } from "react-helmet-async";
import { HomeView } from "../components/Home/view";
import { useTranslation } from "react-i18next";
const HomePage = () => {
  const {t} = useTranslation('global')
  return (
    <>
      <Helmet>
        <title>{t("helmet.home")}</title>
      </Helmet>

      <HomeView/>
    </>
  );
};

export default HomePage;
