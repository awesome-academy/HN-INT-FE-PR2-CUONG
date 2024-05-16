import { useTranslation } from "react-i18next"
import { formatDate, formatPrice } from "../../utils/format"
import { useEffect, useState } from "react"
import { getUserOrder, updateOrder } from "../../services/order"
import Loading from "../Loading"
import orderImg from '../../assets/order.png'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { toastOption } from "../../utils/toastify"
import Modal from "../Modal"
import CreateReview from "./create-review"

const OrderDetail = ({ order, markAsDelivered }) => {
    const { t } = useTranslation("global")
    const status = order?.order_status == "pending" ? t("account.order.status.progress") : t("account.order.status.delivered")

    const handleReceived = () => {
        markAsDelivered(order?.id)
    }
    const [openReview, setOpenReview] = useState(false)

    return (
        <div className="w-full">
            <div className="w-full py-4 bg-[rgb(237,183,96)] flex md:flex-row md:flex-nowrap flex-wrap">
                <div className="md:w-1/3 w-full flex px-2 md:border-r-2 
                    border-[rgb(230,230,230)] justify-center text-center md:mb-0 mb-6">
                    <div className="space-y-4 flex flex-col justify-between md:min-w-0 min-w-[130px]">
                        <p className="md:text-lg font-bold opacity-80">{t('account.order.id')}</p>
                        <p className="md:text-xl font-bold truncate w-full">#{order?.id}</p>
                    </div>
                </div>
                <div className="md:w-1/3 w-1/2 px-2 md:border-r-2 md:mb-0 mb-6 border-[rgb(230,230,230)] flex justify-center">
                    <div className="space-y-4 flex flex-col justify-between text-center min-w-[120px]">
                        <p className="md:text-lg font-bold opacity-80">{t('account.order.total')}</p>
                        <p className="md:text-xl font-bold">{formatPrice(order?.order_total)}</p>
                    </div>
                </div>
                <div className="md:w-1/3 w-1/2 px-2 md:border-r-2 md:mb-0 mb-6 border-[rgb(230,230,230)] flex justify-center">
                    <div className="space-y-4 flex flex-col justify-between text-center">
                        <p className="md:text-lg font-bold opacity-80">{t('account.order.estimated')}</p>
                        <p className="md:text-xl  font-bold">{formatDate(order?.updatedAt)}</p>
                    </div>
                </div>

            </div>
            <div className="w-full border-2 py-2 px-6">
                {order?.order_items?.map((item, index) => (
                    <div key={index} className="w-full  border-b-2 py-4 flex md:space-x-8 space-x-4">
                        <img className="md:min-w-[10rem] md:min-h-[10rem] min-w-[6rem] 
                                max-h-[6rem] shadow-lg md:rounded-none rounded-lg" src={item?.product_image} alt="product-img"
                        />
                        <div className="w-full flex flex-col justify-around">
                            <div className="flex flex-row justify-between items-start">
                                <p className="md:text-xl text-sm font-bold">{item?.product_name}</p>
                                <p className="md:text-lg text-sm font-bold">{formatPrice(item?.price * item?.quantity)}</p>
                            </div>
                            <div className="font-semibold opacity-70 
                                    md:text-lg text-sm flex flex-col
                                    w-fit
                            ">
                                <span className="capitalize">{t("cart.color")} {item?.color}</span>
                                <span> {t("cart.size")} {item?.size}</span>
                                <span> {t("cart.quantity")}: {item?.quantity}  </span>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="w-full md:space-x-4 md:space-y-0 space-y-4 py-4 flex md:flex-row flex-col md:justify-between">
                    <div className="flex flex-row items-center">
                        <p className="md:text-xl font-medium capitalize border-[3px] p-2 w-fit text-nowrap"
                            style={{
                                backgroundColor: order?.order_status != "pending" ? "rgba(228, 180, 47,0.2)" : "rgba(74,188,120,0.1)"
                                , color: order?.order_status != "pending" ? "rgb(228, 180, 47)" : "rgb(74,188,120)",
                                borderColor: order?.order_status != "pending" ? "rgb(228, 180, 47)" : "rgb(74,188,120)"
                            }}
                        >
                            {status}
                        </p>
                        <p className="text-xl md:flex hidden flex-grow font-medium ml-2">
                            {order?.order_status == "pending" ? t('account.order.status.title') : t('account.order.status.title2')}
                        </p>
                    </div>
                    {order?.order_status == "delivered"
                        ?
                        <button className="bg-[rgb(62,24,0)] text-white font-bold 
                         md:h-[4rem] h-[3rem] w-[10rem]"
                            onClick={() => setOpenReview(true)}
                        >
                            Thêm đánh giá
                        </button>
                        : <button className="bg-[rgb(62,24,0)] text-white font-bold 
                            md:h-[4rem] h-[3rem] w-[10rem]"
                            onClick={handleReceived}
                        >
                            Đã nhận hàng
                        </button>
                    }
                </div>
            </div>
             
            <Modal open={openReview} onClose={() => setOpenReview(false)}>
                <CreateReview items={order?.order_items} user_id={order?.user_id}/>
            </Modal>       
        </div>
    )
}

const AccountOrder = ({ user_id }) => {

    const { t } = useTranslation("global")

    const [orders, setOrder] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchOrder = async () => {
        setLoading(true)
        const response = await getUserOrder(user_id)
        console.log(response)
        setOrder(response)
        setLoading(false)
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    const markAsDelivered = async (order_id) => {
        await updateOrder(order_id)
        toast.success(t('account.order.success'), toastOption)
        fetchOrder()
    }

    return (
        <div className="w-full space-y-6">

            {orders?.length == 0
                ? loading
                    ? <div className="w-full min-h-[20rem] flex items-center justify-center">
                        <Loading />
                    </div>
                    :
                    <div className="w-full flex flex-col sm:space-y-4 space-y-2 items-center justify-center">
                        <img className="sm:h-[15rem] h-[10rem] w-[10rem] sm:w-[15rem] rounded-[50%]" src={orderImg} alt="" />
                        <p className="sm:text-lg font-bold text-center">{t("account.order.no-order")}</p>
                        <Link to="/shop">
                            <button className="sm:w-[25rem] w-[20rem] text-xl py-3 bg-[rgb(62,24,0)] text-white font-semibold"
                            >
                                {t("cart.order.back")}
                            </button>
                        </Link>
                    </div>
                :
                <>
                    <p className="md:text-2xl text-xl font-bold">{t("account.order.title")}
                        <span>({orders?.length})</span>
                    </p>

                    {Array.isArray(orders) && orders?.map((order, index) => (
                        <OrderDetail
                            key={index}
                            order={order}
                            markAsDelivered={(id) => markAsDelivered(id)}
                        />
                    ))}
                </>
            }

        </div>
    )
}

export default AccountOrder
