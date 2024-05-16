import { useEffect, useState } from "react"
import { useProductStore } from "../../states/products"
import { MdArrowBackIos, MdArrowForwardIos, MdDelete, MdEdit, MdOutlineKeyboardDoubleArrowDown } from "react-icons/md"
import Loading from "../Loading"
import { formatDate, formatPrice, formatStar } from "../../utils/format"
import { AiFillStar } from "react-icons/ai"
import Modal from "../Modal"
import { toast } from "react-toastify"
import { toastOption } from "../../utils/toastify"
import ProductItems from "./items-product"

const Product = ({ product, removeProduct }) => {
    
    const [openModal, setOpenModal] = useState(false)

    const handleDelete = async () => {
        await removeProduct(product?.id)
        setOpenModal(false)
        toast.success("Xóa sản phẩm thành công!", toastOption)
    }

    const [openItems, setOpenItems] = useState(false)

    return (
    <>
        <tr className="bg-white hover:bg-transparent text-[14px] border-t-[1px]">
            <td className="text-start pl-[24px] w-1/4 font-semibold ">
                <div className="flex flex-row items-center space-x-2 py-1">
                    <img loading="lazy" src={product?.product_image}
                        className="h-[70px] w-[70px] rounded-md object-cover"
                        alt="" />
                    <span>
                        {product?.product_name}
                    </span>
                </div>
            </td>
            <td className="text-start w-[10%] font-medium">
                <div className="flex flex-col pl-6">
                    <span>
                        {product?.gender == "male"
                            ? "Nam"
                            : product?.gender == "female"
                                ? "Nữ"
                                : "Trẻ em"}
                    </span>

                    <span>
                        {
                            product?.category == "shoes"
                                ? "Giày"
                                : product?.category == "clothes"
                                    ? "Quần áo"
                                    : "Phụ kiện"
                        }
                    </span>
                    <span className="capitalize">
                        {product?.brand}
                    </span>
                </div>
            </td>
            <td className="text-center w-[10%] font-medium">{formatPrice(product?.price)}</td>
            <td className="text-center w-[6%] font-medium">{product?.sale}%</td>
            <td className="text-center w-[6%] font-medium">
                <div className="flex flex-row items-center justify-center space-x-1">
                    <span>{formatStar(product?.rating)}</span>
                    <AiFillStar className="w-[1rem] h-[2rem] text-[rgb(244,189,98)]" />
                </div>
            </td>
            <td className="text-center w-[14%]">{formatDate(product?.createdAt)}</td>
            <td className="text-center w-[14%]">{formatDate(product?.updatedAt)}</td>
            <td className="pr-[24px] ">
                <div className="flex justify-center space-x-2">
                    <div className={`p-2 rounded-[50%] cursor-pointer transition-all duration-300
                    ${openItems ? "rotate-180 bg-[rgba(0,0,0,0.3)]" : "text-[rgb(114,117,115)] bg-[rgba(114,117,115,0.3)] "}`
                    }
                        onClick={() => setOpenItems(!openItems)}
                    >
                        <MdOutlineKeyboardDoubleArrowDown className="w-[1.2rem] 
                        h-[1.2rem]" />
                    </div>

                    <div className="bg-[rgba(24,119,242,0.3)] p-2 rounded-[50%] cursor-pointer"
                    >
                        <MdEdit className="w-[1.2rem] h-[1.2rem] text-[rgb(24,119,242)]" />
                    </div>

                    <div className="bg-[rgba(255,86,48,0.3)] p-2 rounded-[50%] cursor-pointer"
                        onClick={() => setOpenModal(true)}
                    >
                        <MdDelete className="w-[1.2rem] h-[1.2rem] text-[rgb(255,86,48)]" />
                    </div>

                </div>
            </td>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="w-56 h-full flex justify-center items-center flex-col space-y-2">
                    <MdDelete className="w-[3rem] h-[3rem] text-[rgb(255,86,48)]" />
                    <h3 className="text-lg font-black text-gray-800">Xóa sản phẩm</h3>
                    <p className="text-[12px] text-center text-gray-500">
                        Bạn có chắc là muốn xóa sản phẩm
                        <span className="font-black"> {product?.id}</span>
                    </p>
                    <div className="flex gap-2 w-full">
                        <button className="py-2 px-4 bg-[rgb(212,36,36)]
                         text-white font-semibold w-1/2 text-center rounded-xl shadow"
                            onClick={handleDelete}
                        >
                            Xóa
                        </button>
                        <button className="py-2 px-4 bg-[rgb(246,246,246)]
                         text-black font-semibold w-1/2 text-center rounded-xl shadow"
                            onClick={() => setOpenModal(false)}>Hủy</button>
                    </div>
                </div>
            </Modal>
        </tr>
        
        {openItems && <ProductItems open={openItems} items={product?.product_items}/>}
    </>
    )
}

const ListProduct = () => {

    const {adminProducts:products, loading, fetchProductsData, removeProduct } = useProductStore()
    const [activeProduct, setActiveProduct] = useState(0)
    const [startProduct, setStartProduct] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            await fetchProductsData()
        }
        fetchData()
    }, [])

    useEffect(() => {
        setActiveProduct(products?.length > 8 ? 8 : products?.length)
    }, [products])

    return (
        <table className="table-auto w-full">
            <thead className="h-[50px] w-full text-[14px] text-[#637381] ">
                <tr className="w-full ">
                    <th className="text-start pl-[24px] w-1/4 font-medium">Tên sản phẩm</th>
                    <th className="text-start w-[10%] font-medium pl-6">Danh mục</th>
                    <th className="text-center w-[10%] font-medium">Giá</th>
                    <th className="text-center w-[6%] font-medium">Giảm giá</th>
                    <th className="text-center w-[6%] font-medium">Đánh giá</th>
                    <th className="text-center w-[14%] font-medium">Ngày tạo</th>
                    <th className="text-center w-[14%] font-medium">Ngày cập nhật</th>
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
                    : products?.length
                        ? <>
                            {Array.isArray(products) && products?.slice(startProduct, activeProduct)?.map((product, index) => (
                                <Product key={index} product={product} removeProduct={removeProduct} />
                            ))}
                            <tr className="w-full bg-white px-6 h-[50px] text-[14px] border-t-[1px]">
                                <td className="text-start pl-[24px] w-1/4 font-medium"></td>
                                <td className="text-start w-[10%] font-medium"></td>
                                <td className="text-center w-[10%] font-medium"></td>
                                <td className="text-center w-[10%] font-medium"></td>
                                <td className="text-center w-[10%] font-medium"></td>
                                <td className="text-center w-[10%] font-medium"></td>
                                <td className="text-center w-[10%] font-medium">
                                    <p>{startProduct + 1} - {activeProduct} trên {products?.length}</p>
                                </td>
                                <td className="text-center font-medium pr-2">
                                    <div className="flex flex-row justify-center gap-1">
                                        <div className={`p-2 flex justify-center items-center
                                ${startProduct ? "cursor-pointer rounded-[50%] hover:bg-[rgb(230,230,230)]"
                                                : "text-[#637381]"}
                            `}
                                            onClick={() => {
                                                if (startProduct) {
                                                    setStartProduct(startProduct - 8)
                                                    if (startProduct != activeProduct - 1) {
                                                        setActiveProduct(
                                                            activeProduct - 8 > 8 ? activeProduct - 8 : 8
                                                        )
                                                    }
                                                    else setActiveProduct(activeProduct - 1)
                                                }
                                            }}
                                        >
                                            <MdArrowBackIos />
                                        </div>
                                        <div className={`p-2 flex justify-center items-center
                                        ${activeProduct < products?.length ? "rounded-[50%] hover:bg-[rgb(230,230,230)] cursor-pointer "
                                                : "text-[#637381]"}
                                        `}
                                            onClick={() => {
                                                if (activeProduct < products?.length) {
                                                    setActiveProduct(
                                                        activeProduct + 8 < products?.length ? activeProduct + 8 : products?.length
                                                    )
                                                    setStartProduct(startProduct + 8)
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
                                        Không có sản phẩm nào phù hợp với tìm kiếm của bạn
                                    </p>
                                    <p className="font-normal text-sm text-gray-500">
                                        Hãy thử kiếm tra lỗi chính tả hoặc
                                        điền đầy đủ tên sản phẩm cần tìm.
                                    </p>
                                </div>
                            </td>
                        </tr>
                }
            </tbody>
        </table>
    )
}

export default ListProduct
