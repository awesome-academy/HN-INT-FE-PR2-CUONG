import { MdArrowBackIos, MdArrowForwardIos, MdOutlineKeyboardDoubleArrowDown } from "react-icons/md"
import { useOrderStorage } from "../../states/order"
import Loading from "../Loading"
import { useEffect, useState } from "react"
import { formatDate, formatPrice } from "../../utils/format"
import OrderItem from "./order-item"

const Order = ({ order }) => {

    const [openItems, setOpenItems] = useState(false)

    return (
        <>
            <tr className="bg-white hover:bg-transparent text-[14px] border-t-[1px]">
                <td className="text-start pl-[24px] w-1/5 font-semibold ">
                    {order?.id}
                </td>
                <td className="text-center w-[12%] font-semibold">
                    <div className="flex flex-row items-center space-x-2 py-2">
                        <img src={order?.user?.user_image || "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1715076914/avatars/1_zriyqx.jpg"}
                            className="w-10 h-10 rounded-[50%]"
                            alt="avatar" />
                        <span>{order?.user?.user_name || order?.shipping_address?.name}</span>
                    </div>
                </td>
                <td className="text-center w-[6%] font-medium">
                    {order?.order_items?.length}
                </td>
                <td className="text-center w-[14%] font-medium">
                    {formatPrice(order?.order_total)}
                </td>
                <td className="text-center w-[14%] font-medium">
                    {formatDate(order?.createdAt)}
                </td>
                <td className="text-center w-[12%] font-medium">
                    {formatDate(order?.updatedAt)}
                </td>

                <td className="text-center w-[10%] font-medium px-3">
                    <div className={`py-1 rounded-full ${order?.order_status == "pending"
                        ? "bg-[rgba(24,119,242,0.3)] text-[rgb(24,119,242)]"
                        : "bg-[rgba(255,86,48,0.3)] text-[rgb(255,86,48)]"}`}>
                        {order?.order_status == "pending" ? "Đang xử lý" : "Đã giao"}
                    </div>
                </td>

                <td className=" pr-[24px]">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className={`p-2 rounded-[50%] cursor-pointer transition-all duration-300
                            ${openItems ? "rotate-180 bg-[rgba(0,0,0,0.3)]" : "text-[rgb(114,117,115)] bg-[rgba(114,117,115,0.3)] "}`
                        }
                            onClick={() => setOpenItems(!openItems)}
                        >
                            <MdOutlineKeyboardDoubleArrowDown className="w-[1.2rem] h-[1.2rem]"/>
                        </div>
                    </div>
                </td>

            </tr>

            {openItems && <OrderItem items={order?.order_items} address={order?.shipping_address}/>}

        </>
    )
}

const ListOrder = () => {

    const { orders, fetchOrdersData, loading } = useOrderStorage()

    const [activeOrder, setActiveOrder] = useState(0)
    const [startOrder, setStartOrder] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            await fetchOrdersData()
        }
        fetchData()
    }, [])

    useEffect(() => {
        setActiveOrder(orders?.length > 8 ? 8 : orders?.length)
    }, [orders])


    return (
        <table className="table-auto w-full">
            <thead className="h-[50px] w-full text-[14px] text-[#637381] ">
                <tr className="w-full">
                    <th className="text-start pl-[24px] w-1/5 font-medium">Mã đơn hàng</th>
                    <th className="text-center w-[12%] font-medium">Người tạo</th>
                    <th className="text-center w-[6%] font-medium">Vật phẩm</th>
                    <th className="text-center w-[12%] font-medium">Tổng tiền</th>
                    <th className="text-center w-[14%] font-medium">Ngày tạo</th>
                    <th className="text-center w-[14%] font-medium">Ngày cập nhật</th>
                    <th className="text-center w-[10%] font-medium">Trạng thái</th>
                    <th className="text-center pr-[24px] font-medium">Thao tác</th>
                </tr>
            </thead>
            <tbody className="w-full">
                {loading
                    ? <tr className="w-full bg-white">
                        <td colSpan={8} className="text-center w-[10%] font-medium">
                            <div className="min-h-[20rem] flex justify-center items-center">
                                <Loading />
                            </div>
                        </td>
                    </tr>
                    : orders?.length
                        ? <>
                            {Array.isArray(orders) && orders?.slice(startOrder, activeOrder)?.map((order, index) => (
                                <Order key={index} order={order} />
                            ))}
                            <tr className="w-full bg-white px-6 h-[50px] text-[14px] border-t-[1px]">
                                <td colSpan={7} className="text-end w-[10%] font-medium">
                                    <p>{startOrder + 1} - {activeOrder} trên {orders?.length}</p>
                                </td>
                                <td className="text-center font-medium pr-2">
                                    <div className="flex flex-row justify-center gap-1">
                                        <div className={`p-2 flex justify-center items-center
                                ${startOrder ? "cursor-pointer rounded-[50%] hover:bg-[rgb(230,230,230)]"
                                                : "text-[#637381]"}
                            `}
                                            onClick={() => {
                                                if (startOrder) {
                                                    setStartOrder(startOrder - 8)
                                                    if (startOrder != activeOrder - 1) {
                                                        setActiveOrder(
                                                            activeOrder - 8 > 8 ? activeOrder - 8 : 8
                                                        )
                                                    }
                                                    else setActiveOrder(activeOrder - 1)
                                                }
                                            }}
                                        >
                                            <MdArrowBackIos />
                                        </div>
                                        <div className={`p-2 flex justify-center items-center
                                        ${activeOrder < orders?.length ? "rounded-[50%] hover:bg-[rgb(230,230,230)] cursor-pointer "
                                                : "text-[#637381]"}
                                        `}
                                            onClick={() => {
                                                if (activeOrder < orders?.length) {
                                                    setActiveOrder(
                                                        activeOrder + 8 < orders?.length ? activeOrder + 8 : orders.length
                                                    )
                                                    setStartOrder(startOrder + 8)
                                                }
                                            }}
                                        >
                                            <MdArrowForwardIos />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </>
                        : <tr className="w-full bg-white">
                            <td colSpan={8} className="text-center">
                                <div className="h-[15rem] w-full flex flex-col justify-center items-center">
                                    <h3 className="font-black text-xl my-4">Không tìm được!</h3>
                                    <p className="font-normal text-sm my-2 text-gray-500">
                                        Không có đơn hàng nào phù hợp với tìm kiếm của bạn
                                    </p>
                                    <p className="font-normal text-sm text-gray-500">
                                        Hãy thử kiếm lại mã đơn hàng hoặc gõ đầy đủ mã đơn hàng
                                    </p>
                                </div>
                            </td>
                        </tr>
                }
            </tbody>
        </table>
    )
}

export default ListOrder
