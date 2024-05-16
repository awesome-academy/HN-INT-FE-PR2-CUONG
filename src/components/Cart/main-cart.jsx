import { useTranslation } from "react-i18next"
import { FaTrash } from "react-icons/fa6"
import { formatPrice, subTotal } from "../../utils/format"
import { toast } from "react-toastify"
import { toastOption } from "../../utils/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useCartStore } from "../../states/cart"
import { useEffect, useState } from "react"
import Loading from "../Loading"
import emptyCart from "../../assets/emptycart.svg"
import { useUserStorage } from "../../states/user"

const Product = ({ product }) => {
    const { t } = useTranslation("global")

    const { updateCartItemQuantity, removeFromCart } = useCartStore()
    const [quantity, setQuantity] = useState(product?.quantity)

    const handleDelete = () => {
        toast.success("Delete Sucessfully", toastOption)
        removeFromCart(product?.product_item_id)
    }

    const handleChangeQuantity = (type) => {
        if (type == "minus") {
            if (quantity > 1) {
                const newQuantity = quantity - 1
                setQuantity(newQuantity)
                updateCartItemQuantity(product?.product_item_id, newQuantity)
            }
        } else {
            if (quantity >= product?.qty_in_stock) {
                toast.error(t("product.stock.max"), toastOption)
            }
            else {
                const newQuantity = quantity + 1
                setQuantity(newQuantity)
                updateCartItemQuantity(product?.product_item_id, newQuantity)
            }
        }
    }

    return (
        <div className="w-full md:h-auto h-[8rem] flex flex-row justify-start 
            items-center md:px-0 px-2 py-4 border-b-2 md:last:border-b-2 last:border-none
             border-[rgb(230,230,230)] md:mb-0 mb-2 relative">

            {!product?.qty_in_stock && <div className="w-full h-full absolute bg-[rgba(158,0,2,0.1)] text-[rgb(158,0,2)]
                     sm:text-lg text-center font-bold flex flex-col justify-center items-center z-10"
                style={{ backdropFilter: "blur(2px)" }}
            >
                <p>{t("product.stock.out")}</p>
                <p className="text-black">{t("product.out")}</p>
            </div>}

            <span className="md:w-1/2 w-full md:text-xl flex flex-row md:space-x-4 space-x-2 items-center">
                <img className="md:w-[10rem] md:min-h-[10rem] w-[7rem]
                        max-h-[6rem] md:shadow-lg rounded-lg"
                    src={product?.product_image} alt="" />
                <div className="flex md:w-auto w-full flex-col md:justify-center justify-between md:space-y-4 space-y-2">
                    <p className="w-full md:max-h-[56px] max-h-[44px] text-wrap truncate font-medium">{product?.product_name}</p>
                    <div className="font-semibold opacity-70 
                        md:text-lg text-[12px]
                       w-fit
                    ">
                        <span className="capitalize">{t("cart.color")} {product?.color} |</span>
                        <span> {t("cart.size")} {product?.size}</span>
                    </div>
                    <div className="md:hidden flex flex-row justify-between items-center">
                        <div className="font-medium text-lg">{formatPrice(product?.price)}</div>
                        <div className="w-full flex justify-between max-w-[7rem] border-2">
                            <span className="cursor-pointer px-2">-</span>
                            <span className="mx-4 text-center">{quantity}</span>
                            <span className="cursor-pointer px-2">+</span>
                        </div>
                    </div>
                </div>
            </span>
            <span className="w-1/6 md:inline hidden text-xl text-center font-medium opacity-80">
                {formatPrice(product?.price)}
            </span>
            <span className="w-1/4 md:flex hidden justify-center text-xl font-medium">
                <div className="w-full flex justify-between max-w-[10rem] border-2 py-2 px-4">
                    <span className="cursor-pointer px-2"
                        onClick={() => handleChangeQuantity("minus")}
                    >-</span>
                    <span className="mx-4 text-center w-4/5">{quantity}</span>
                    <span className="cursor-pointer px-2" onClick={() => handleChangeQuantity("add")}>+</span>
                </div>
            </span>
            <span className="w-1/6 md:inline hidden  text-xl text-center font-medium">
                {formatPrice(product?.price * quantity)}
            </span>
            <div className="md:w-[2rem] md:self-center self-start md:mt-0 mt-2 z-10 cursor-pointer float-right opacity-50">
                <FaTrash className="md:w-[20px] md:h-[20px]" onClick={handleDelete} />
            </div>
        </div>
    )
}

const MainCart = () => {

    const { t } = useTranslation("global")
    const { cart, getCartItems, loading } = useCartStore()
    const {user} = useUserStorage()
    useEffect(() => {
        getCartItems()
    }, [])

    const navigate = useNavigate()

    const handleCheckout = () => {
        if(!user){
            toast.warning("Đăng nhập để đặt đơn!", toastOption)
        }else{
            sessionStorage.setItem("totalPrice", subTotal(cart) * 1.1)
            navigate("/checkout")
        }
    }

    return (
        <div className="flex justify-center">
            {cart.length === 0
                ? 
                <div className="flex flex-col justify-center items-center space-y-6 sm:my-10 my-4">
                    <img src={emptyCart} alt="" />
                    <p className="sm:text-2xl font-bold text-red-500">{t("product.empty")}</p>
                    <Link to="/shop">
                    <button className="sm:w-[25rem] w-[20rem] text-xl py-3 bg-[rgb(62,24,0)] text-white font-semibold"
                    >
                        {t("cart.order.back")}
                    </button>
                    </Link>
                </div>
                : <div className="w-full xl:flex max-w-screen-2xl xl:space-x-4 md:space-y-0 space-y-4 2xl:px-0 md:px-2">
                    <div className="xl:w-3/4 md:w-full">
                        <div className=" md:flex hidden w-full flex-row justify-start items-center py-2 bg-[rgb(244,189,98)]">
                            <span className="w-1/2 lg:pl-6 pl-2 text-xl font-medium">{t("cart.product")}</span>
                            <span className="w-1/6 text-xl text-center font-medium">{t("cart.price")}</span>
                            <span className="w-1/4 text-xl text-center font-medium">{t("cart.quantity")}</span>
                            <span className="w-1/6 text-xl text-center font-medium">{t("cart.sub")}</span>
                            <div className="w-[2rem]"></div>
                        </div>
                        {cart.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                    <div className="xl:w-1/4 w-full h-fit border-2 md:px-6 px-2 py-2 border-[rgb(230,230,230)]">
                        {loading
                            ? <div className="min-h-[20rem] flex justify-center items-center w-full">
                                <Loading />
                            </div>
                            : <div className="space-y-4  py-2">
                                <div className="text-xl font-bold pb-2 border-b-2">{t("cart.order.title")}</div>
                                <div className="flex flex-row justify-between text-lg font-medium items-center">
                                    <span className="opacity-70">{t("cart.order.item")}</span>
                                    <span>{Array.isArray(cart) && cart?.length}</span>
                                </div>
                                <div className="flex flex-row justify-between text-lg font-medium items-center">
                                    <span className="opacity-70">{t("cart.order.sub")}</span>
                                    <span>{formatPrice(subTotal(cart))}</span>
                                </div>
                                <div className="flex flex-row justify-between text-lg font-medium items-center">
                                    <span className="opacity-70">{t("cart.order.tax")}</span>
                                    <span>{formatPrice(subTotal(cart) / 10)}</span>
                                </div>
                                <div className="flex flex-row justify-between text-xl font-bold items-center border-t-2 pt-4">
                                    <span>{t("cart.order.total")}</span>
                                    <span>{formatPrice(subTotal(cart) * 1.1)}</span>
                                </div>
                                <p className="text-center text-red-500 font-bold sm:text-base">({t("cart.order.ship")})</p>
                                <button className="w-full text-xl py-3 bg-[rgb(62,24,0)] text-white font-semibold"
                                    onClick={handleCheckout}
                                >
                                    {t("cart.order.proceed")}
                                </button>
                            </div>
                        }
                    </div>

                </div>
            }
        </div>
    )
}

export default MainCart
