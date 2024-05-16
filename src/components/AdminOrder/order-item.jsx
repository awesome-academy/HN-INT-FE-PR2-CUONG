import { formatPrice } from "../../utils/format"

const OrderItem = ({ items, address }) => {
    console.log(items)
    return (
        <td colSpan={8}>
            <table className="table-auto w-full">
                <thead className="h-[50px] text-[14px] text-[#637381]">
                    <tr>
                        <th className="w-[35%] pl-[5rem] text-start font-medium">Tên sản phẩm</th>
                        <th className="w-[15%] font-medium">Đơn giá</th>
                        <th className="w-[10%] text-center font-medium">Số lượng</th>
                        <th className="font-medium w-[10%] text-center">Màu sắc</th>
                        <th className="font-medium w-[10%] text-center">Kích thước</th>
                        <th className="font-medium w-[15%] text-center">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map(item => (
                        <tr key={item?._id} className="bg-white hover:bg-transparent text-[14px]">
                            <td className="w-[35%] pl-[5rem] text-start font-medium">
                                <div className="flex flex-row items-center justify-start space-x-2 py-1">
                                    <img src={item?.product_image}
                                        className="w-[70px] h-[70px] object-cover rounded-md"
                                        alt="" 
                                    />
                                    <p>{item?.product_name}</p>
                                </div>
                            </td>
                            <td className="w-[15%] text-center font-medium">{formatPrice(item?.price)}</td>
                            <td className="text-center w-[10%]">{item?.quantity}</td>
                            <td className="font-medium text-center w-[10%] capitalize">{item?.color}</td>
                            <td className="font-medium text-center w-[10%]">{item?.size}</td>
                            <td className="font-medium text-center">{formatPrice(item?.quantity * item?.price)}</td>
                            
                        </tr>
                    ))}
                        <tr>
                            <td colSpan={8}>
                                <p className="text-sm px-[5rem] font-medium text-start bg-white py-4 space-x-6">
                                    <span className="font-normal">Thông tin người nhận: </span>
                                    {address?.name} - {address?.phone}
                                    <span className="font-normal">Địa chỉ nhận hàng: </span>
                                     {address?.street} - {address?.ward} - {address?.district} - {address?.city}
                                </p>
                            </td>
                        </tr>
                </tbody>
            </table>
        </td>
    )
}

export default OrderItem
