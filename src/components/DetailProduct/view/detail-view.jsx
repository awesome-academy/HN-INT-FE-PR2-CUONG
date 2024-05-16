import { useTranslation } from "react-i18next";
import PageTitle from "../../Page-Title";
import DetailInformation from "../detail-infor";
import DetailReview from "../detail-review";
import RelatedProduct from "../related-product";
import HomePolicy from "../../Home/home-policy";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../../../services/product";
import Loading from "../../Loading";
import { useScrollToTop } from "../../../hooks/use-scroll-to-top";
const ProductDetail = () => {
    const { t } = useTranslation("global");
    const { product_id } = useParams();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        const response = await getProduct(product_id);
        setProduct(response);
        setLoading(false);
    };

    useEffect(() => {
        fetchProduct();
    }, [product_id]);

    useEffect(() => {
        useScrollToTop();
    }, [product_id, product]);

    return (
        <>
            <PageTitle
                title={t("page-title.product")}
                subtitle={t("page-title.product-sub")}
            />
            <div className="flex flex-col items-center pb-6">
                {loading ? (
                    <div className="flex h-screen w-full items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <DetailInformation product={product} />
                        <DetailReview id={product_id}  rating={product?.product.rating}/>
                        <RelatedProduct id={product_id}/>
                        <HomePolicy />
                    </>
                )}
            </div>
        </>
    );
};

export default ProductDetail;
