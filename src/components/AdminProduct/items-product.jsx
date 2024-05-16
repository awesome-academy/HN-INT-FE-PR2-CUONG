import { formatPrice } from "../../utils/format"

const ProductItems = ({ open, items }) => {
    return (
        <td className={`
      transform transition-all overflow-hidden 
      duration-300 py-2
      ${open ?
                "translate-y-0 opacity-100 z-0" :
                "-translate-y-1/4 opacity-0 -z-50 invisible"}`} colSpan={8}>
            <table className="table-auto w-full">
                <thead className="h-[50px] text-[14px] text-[#637381]">
                    <tr>
                        <th className="w-[30%] text-end font-medium" colSpan={2}>Hình ảnh</th>
                        <th className="w-[15%] font-medium">Giá</th>
                        <th className="w-[10%] text-start font-medium">Giảm giá</th>
                        <th className="font-medium w-[11%] text-start">Màu sắc</th>
                        <th className="font-medium w-[11%] text-start">Kích thước</th>
                        <th className="font-medium w-[12%] text-start">Lượng hàng trong kho</th>
                        <th className="flex-grow"></th>
                    </tr>
                </thead>
                <tbody className="h-0">
                    {items?.map(item => (
                        <tr key={item?._id} className="bg-white hover:bg-transparent 
                            text-[14px]">
                            <td className="w-[30%] text-end font-medium" colSpan={2}>
                                <div className="flex flex-row items-center justify-end space-x-2 py-1">
                                    <img src={item?.product_image} 
                                        className="w-[70px] h-[70px] object-cover rounded-md"
                                    alt="" />
                                </div>
                            </td>
                            <td className="w-[15%] text-center font-medium">{formatPrice(item?.price)}</td>
                            <td className="text-start pl-4 font-medium">{item?.sale}%</td>
                            <td className="font-medium capitalize">{item?.color}</td>
                            <td className="font-medium text-start">{item?.size}</td>
                            <td className="font-medium text-center">{item?.quantity}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </td>

    )
}

export default ProductItems
