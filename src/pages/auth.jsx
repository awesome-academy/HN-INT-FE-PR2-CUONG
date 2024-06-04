import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { AuthView } from '../components/Auth/view';

const AuthPage = () => {
  const {t} = useTranslation("global")
  return (
    <>
      <Helmet>
        <title>{t("helmet.auth")}</title>
      </Helmet>

      <AuthView/>
    </>
  );
}

export default AuthPage
