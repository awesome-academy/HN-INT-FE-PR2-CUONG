import { useTranslation } from "react-i18next";
import { formatPrice, subTotal } from "../../utils/format";
import { useCartStore } from "../../states/cart";
import { useUserStorage } from "../../states/user";
import { createOrder } from "../../services/order";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const { t } = useTranslation("global")
    return (
        <div className="w-full md:h-auto h-[8rem] flex flex-row justify-start items-center px-0 py-4 last:border-b-0 border-b-2 border-[rgb(230,230,230)] md:mb-0 mb-2 ">
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
                        <div className="font-medium sm:text-lg">{formatPrice(product?.price)}</div>
                        <div className="w-full flex justify-between max-w-[7rem] ">
                            <span className="ml-2 text-center sm:text-base text-sm">{t("cart.quantity")}: {product?.quantity}</span>
                        </div>
                    </div>
                </div>
            </span>
            <span className="w-1/6 md:inline hidden text-xl text-center font-medium opacity-80">
                {formatPrice(product?.price)}
            </span>
            <span className="w-1/4 md:flex hidden justify-center text-xl font-medium">
                <div className="w-full flex justify-between max-w-[10rem] py-2 px-4">
                    <span className="mx-4 text-center w-4/5">{product?.quantity}</span>
                </div>
            </span>
            <span className="w-1/6 md:inline hidden  text-xl text-center font-medium">
                {formatPrice(product?.price * product?.quantity)}
            </span>
        </div>
    )
}


const CheckOutConfirm = ({ information }) => {
    const { t } = useTranslation("global")
    const { cart, clearCart } = useCartStore()
    const { user } = useUserStorage()
    const navigate = useNavigate()
    const handleCreateOrder = async () => {
        const order = {
            user_id: user?.id,
            shipping_address: {
                name: information?.name,
                phone: information?.phone,
                city: information?.city,
                district: information?.district,
                ward: information?.ward,
                street: information?.address,
            },
            order_total: (subTotal(cart) * 1.1).toFixed(1),
            order_items: cart.map((product) => ({
                product_item_id: product?.product_item_id,
                quantity: product?.quantity,
                price: product?.price
            })),
            order_status: "pending",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        await createOrder(order)
        toast.success(t("checkout.confirm.success"), toastOption)
        clearCart()
        navigate("/")

    }

    return (
        <div className="w-full flex flex-col justify-center items-center lg:px-0 px-2">

            <div className="w-full max-w-screen-2xl flex md:flex-row flex-col justify-between md:space-y-0 space-y-4">
                <div className="w-full sm:min-h-[215px] min-h-none">
                    <div className="bg-white sm:p-4 p-2 rounded-md shadow-md border-2">
                        <h1 className="sm:text-2xl text-lg font-semibold py-2 border-b-2 border-[rgb(230,230,230)]">{t("checkout.confirm.receiver")}</h1>
                        <div className="mt-4">
                            <p className="sm:text-lg font-medium">
                                {t("checkout.confirm.name")} {information.name}
                            </p>
                            <p className="sm:text-lg font-medium">
                                {t("checkout.confirm.phone")} {information.phone}
                            </p>
                            <p className="sm:text-lg font-medium text-wrap">
                                {t("checkout.confirm.address")}
                                {information.address} - {information.ward} - {information.district} - {information.city}
                            </p>
                            <p className="sm:text-lg">
                                {t("checkout.confirm.note")} {information?.note || t("checkout.confirm.no-note")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-screen-2xl px-4 py-2 sm:mt-4 shadow-sm">
                <p className="text-center sm:text-2xl text-lg font-bold py-4 border-b-2 border-[rgb(230,230,230)]">{t("checkout.confirm.list")}</p>
                {Array.isArray(cart) && cart.map((product, index) => (
                    <Product key={index} product={product} />
                ))}

                <div className="flex flex-col">
                    <div className="w-full flex justify-end  items-center sm:text-xl text-base font-medium py-4">
                        <span>{t("checkout.confirm.shipping")}</span>
                        <p className="w-[7.5rem] text-end">{cart?.length}</p>
                    </div>
                    <div className="w-full flex justify-end items-center sm:text-xl text-base font-medium py-4">
                        <span>{t("checkout.confirm.total")}</span>
                        <p className="w-[7.5rem] text-end">{formatPrice(subTotal(cart))}</p>
                    </div>
                    <div className="w-full flex justify-end  items-center sm:text-xl text-base font-medium py-4">
                        <span>{t("checkout.confirm.discount")}</span>
                        <p className="w-[7.5rem] text-end">{formatPrice(0)}</p>
                    </div>
                    <div className="w-full flex justify-end  items-center sm:text-xl text-base font-medium py-4">
                        <span>{t("checkout.confirm.total-pay")}</span>
                        <p className="w-[7.5rem] text-end">{formatPrice(subTotal(cart) * 1.1)}</p>
                    </div>
                    <p className="text-end text-red-500 font-bold sm:text-lg text-base">({t("cart.order.ship")})</p>
                </div>

                <button className="md:w-fit float-right flex flex-row items-center justify-center mt-4
                 text-white md:min-w-[25rem] w-full px-4 sm:py-5 py-2 h-fit sm:text-xl font-bold bg-[rgb(62,24,0)]"
                    onClick={handleCreateOrder}
                >
                    {t("checkout.confirm.button")}
                </button>

            </div>

        </div>
    )
}

export default CheckOutConfirm
