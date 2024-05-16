import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../Card";
import { getHotProducts } from "../../services/product";
import Loading from "../Loading";

const HomeTopProducts = () => {
  const { t } = useTranslation("global");

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getHotProducts()
      setProducts(response)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <section className="w-full flex justify-center mt-8">
      <div className="w-full max-w-screen-2xl">
        <div className="flex lg:flex-row flex-col justify-between lg:items-end 2xl:px-0 px-2">
          <div className="h-fit w-full">
            <h2 className="text-xl font-normal">
              {t("homepage.top-sell.title")}
            </h2>
            <div className="w-full flex flex-row justify-between items-center mt-2">
              <h1 className="sm:text-4xl sm:mb-0 text-3xl mb-3 font-bold">
                {t("homepage.top-sell.description")}
              </h1>
            </div>
          </div>
          
        </div>

        <div
          className="w-full flex lg:flex-wrap flex-row justify-between md:mt-4 mt-8 2xl:px-0 md:px-2 px-2
          lg:overflow-hidden overflow-x-auto whitespace-nowrap scrollbar
          "
        >
          {loading
            ? <div className="min-h-[1024px] flex w-full items-center justify-center">
              <Loading />
              </div>
            : products?.map((product, index) => (
              <div key={index} className="inline-block lg:w-[23%] lg:min-w-[320px] md:min-w-[400px] min-w-[360px] mr-3 md:mr-8 lg:mt-8 lg:mr-2 last:mr-0 ">
                <ProductCard product={product} />
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default HomeTopProducts;
