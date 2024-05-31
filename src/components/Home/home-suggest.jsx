import { useTranslation } from "react-i18next";
import ProductCard from "../Card";

const HomeSuggest = () => {
  const { t } = useTranslation("global");

  const products = new Array(8).fill(undefined);

  return (
    <section className="w-full flex justify-center mt-10 lg:px-3">
      <div className="w-full max-w-screen-2xl">
        <h1 className="sm:text-4xl sm:mb-0 sm:ml-0 ml-2 text-3xl mb-3 font-bold">
          {t("homepage.suggest")}
        </h1>

        <div
          className="w-full flex lg:flex-wrap flex-row justify-between md:mt-4 mt-8 2xl:px-0 md:px-2 px-2
          lg:overflow-hidden overflow-x-auto whitespace-nowrap scrollbar
          "
        >
          {products.map((_, index) => (
            <div
              key={index}
              className="inline-block lg:w-[23%] lg:min-w-[320px] md:min-w-[400px] min-w-[360px] mr-3 md:mr-8 lg:mt-8 lg:mr-2 last:mr-0 "
            >
              <ProductCard />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSuggest;
