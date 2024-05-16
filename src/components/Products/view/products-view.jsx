import { useTranslation } from "react-i18next";
import PageTitle from "../../Page-Title";
import Filter from "../Filter";
import ProductData from "../products-data";
import Loading from "../../Loading";
import { useSidebarStore } from "../../../states/sidebar";
import HomePolicy from "../../Home/home-policy";

const ProductsView = () => {
  const { t } = useTranslation("global");
  const {filterBarOpen} = useSidebarStore()

  return (
    <section className="pb-6">
      <PageTitle
        title={t("page-title.shop")}
        subtitle={t("page-title.shop-sub")}
      />
      <div className="flex w-full sm:py-16 py-6 bg-white justify-center">
        <div className="w-full h-fit max-w-screen-2xl flex flex-row">
          <div className={`lg:w-1/5 lg:block ${filterBarOpen ? "block w-full fixed overflow-auto h-screen top-0 z-50 bg-white" : "hidden"}`}>
            <Filter />
          </div>
          <div className="lg:w-4/5 w-full md:pl-6 pl-2 max-2xl:pr-2 relative">
            <ProductData />
            {/* {1 && (
              <div className="w-full top-10 md:pl-6 pl-2 h-[90%] 
                z-10 absolute flex items-center justify-center"
              >
                <Loading />
              </div>
            )} */}
          </div>
        </div>
      </div>
      <HomePolicy/>
    </section>
  );
};

export default ProductsView;
