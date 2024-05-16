import { useTranslation } from "react-i18next"
import img from "../../assets/shoes.jpg"
import img1 from "../../assets/cocacola.jpg"
import { formatPrice } from "../../utils/format"
import { date } from "zod"
import { FaCartShopping, FaTrash } from "react-icons/fa6"

const WishlistProduct = ({ product }) => {
    const { t } = useTranslation("global")
    return (
        <div className="w-full max-w-screen-2xl md:h-auto h-[8rem] flex flex-row justify-start items-center md:px-0 px-2 py-4 border-b-2 border-[rgb(230,230,230)] md:mb-0 mb-2 ">
            <span className="md:w-[40%] w-full md:text-xl flex flex-row md:space-x-4 space-x-2 items-center">
                <img className="md:min-w-[10rem] md:min-h-[10rem] min-w-[6rem] max-h-[6rem] md:shadow-lg md:rounded-none rounded-lg" src={product?.img} alt="" />
                <div className="flex md:w-auto w-full flex-col md:justify-center justify-between md:space-y-4 space-y-2">
                    <p className="w-full md:max-h-[56px] max-h-[44px] text-wrap truncate font-medium">{product?.name}</p>
                    <div className="font-semibold opacity-70 
                    md:text-lg text-sm 
                   w-fit
                ">
                        <span>{t("cart.color")} {product?.color} |</span>
                        <span> {t("cart.size")} {product?.size}</span>
                    </div>
                    <div className="md:hidden flex flex-row justify-between items-center">
                        <div className="font-medium text-lg">{formatPrice(product?.price)}</div>
                        <div className="w-fit px-1 py-2"
                            style={{
                                borderColor: product?.inStock ? "rgb(74,188,120)" : "rgb(158,0,2)",
                                color: product?.inStock ? "rgb(74,188,120)" : "rgb(158,0,2)",
                                backgroundColor: product?.inStock ? "rgba(74,188,120,0.1)" : "rgba(158,0,2,0.1)"
                            }}>
                            {product?.inStock ? t("product.stock.in") : t("product.stock.out")}
                        </div>
                    </div>
                </div>
            </span>
            <span className="w-[10%] md:inline hidden text-xl text-center font-medium opacity-80">
                {formatPrice(product?.price)}
            </span>
            <span className="w-[22%] md:flex hidden lg:justify-center justify-end text-xl font-medium">
                {product?.date}
            </span>
            <span className="w-[18%] md:flex hidden text-xl justify-center font-medium">
                <p className="w-fit py-2 px-4"
                    style={{
                        borderColor: product?.inStock ? "rgb(74,188,120)" : "rgb(158,0,2)",
                        color: product?.inStock ? "rgb(74,188,120)" : "rgb(158,0,2)",
                        backgroundColor: product?.inStock ? "rgba(74,188,120,0.1)" : "rgba(158,0,2,0.1)"
                    }}>
                    {product?.inStock ? t("product.stock.in") : t("product.stock.out")}
                </p>
            </span>
            <div className="w-[10%] flex md:flex-row md:ml-0 ml-2 flex-col items-center text-white  justify-end md:space-x-3 md:space-y-0 space-y-4 cursor-pointer float-right">
                <div className="rounded-[50%] bg-[rgba(62,24,0,0.7)] md:p-3 p-2"><FaCartShopping className="md:w-[24px] md:h-[24px]" /></div>
                <div className="rounded-[50%] bg-[rgba(158,0,2,0.7)] md:p-3 p-2"><FaTrash className="md:w-[20px] md:h-[20px]" /></div>
            </div>
        </div>
    )
}

const MainWishList = () => {
    const { t } = useTranslation("global")

    const products = [
        {
            img: img,
            name: "Classy Light Coat",
            color: "Brown",
            size: "XXL",
            price: 15000,
            date: "18/02/2024",
            inStock: false
        },
        {
            img: img1,
            name: "Dép lê nam, Thiết kế hình cá mập hoạt hình mùa hè, đi trong",
            color: "Brown",
            size: "XXL",
            price: 1500,
            date: "18/02/2024",
            inStock: true
        },
        {
            img: img,
            name: "Classy Light Coat",
            color: "Brown",
            size: "XXL",
            price: 1500,
            date: "18/02/2024",
            inStock: true,
        },
        {
            img: img1,
            name: "Dép lê nam, Thiết kế hình cá mập hoạt hình mùa hè, đi trong",
            color: "Brown",
            size: "XXL",
            price: 1500,
            date: "18/02/2024",
            inStock: false
        },
        {
            img: img,
            name: "Classy Light Coat",
            color: "Brown",
            size: "XXL",
            price: 1500,
            date: "18/02/2024",
            inStock: true
        },

    ]

    return (
        <section className="w-full flex justify-center items-center flex-col md:py-8">
            <div className="w-full max-w-screen-2xl flex flex-col">
                <div className="md:flex hidden w-full flex-row justify-start items-center py-2 bg-[rgb(244,189,98)]">
                    <span className="w-[40%] lg:pl-6 pl-2 text-xl font-medium">{t("wishlist.product")}</span>
                    <span className="w-[10%] text-xl text-center font-medium">{t("wishlist.price")}</span>
                    <span className="w-[22%] text-xl lg:text-center text-right font-medium">{t("wishlist.date")}</span>
                    <span className="w-[18%] text-xl text-center font-medium">{t("wishlist.stock")}</span>
                    <div className="min-w-[4rem] w-[10%]"></div>
                </div>
            </div>

            {products.map((product, index) => (
                <WishlistProduct key={index} product={product} />
            ))}

        </section>
    )
}

export default MainWishList
