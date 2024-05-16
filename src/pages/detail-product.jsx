import { Helmet } from 'react-helmet-async';
import ProductDetail from '../components/DetailProduct/view/detail-view';
import { useTranslation } from 'react-i18next';

const DetailProduct = () => {
    const {t} = useTranslation('global')
    return (
        <>
            <Helmet>
                <title>{t("helmet.product")}</title>
            </Helmet>
            <ProductDetail/>
        </>
    )
}

export default DetailProduct
