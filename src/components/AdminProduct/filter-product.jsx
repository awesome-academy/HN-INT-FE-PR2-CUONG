import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useClickOutSideToClose } from "../../hooks/use-close-click-outside"
import { debounce } from "lodash"
import { useProductStore } from "../../states/products"
import { useNavigate } from "react-router-dom"

const FilterProduct = () => {
    const [showSort, setShowSort] = useState(false)
    const [sortIndex, setSortIndex] = useState(0)
    const values = [
        {
            value: "newest",
            title: "Thời gian tạo: mới nhất"
        },
        {
            value: "oldest",
            title: "Thời gian tạo: cũ nhất"
        },
        {
            value: "high-rating",
            title: "Đánh giá: cao -> thấp"
        },
        {
            value: "low-rating",
            title: "Đánh giá: thấp -> cao"
        },
        {
            value: "high-price",
            title: "Giá: cao -> thấp"
        },
        {
            value: "low-price",
            title: "Giá: thấp -> cao"
        }
    ]

    const filterRef = useClickOutSideToClose(() => {
        setShowSort(false)
    })

    const handleSort = (value, event) => {
        event.stopPropagation();
        setSortIndex(value)
        setShowSort(false)
    }

    const {searchProduct, fetchProductsData, sortProducts} = useProductStore()

    useEffect(() => {
        sortProducts(values[sortIndex].value)
    },[sortIndex])

    const handleFindProduct = async (keyword) => {
        if(keyword){
            await searchProduct(keyword)
        }
        else fetchProductsData()
        
    }
    const debouncedHandleFindProduct = debounce(handleFindProduct, 500);

    const navigate = useNavigate()

    return (
        <div className="w-full p-6 bg-white flex flex-row 
        justify-between rounded-t-[16px] items-center">

            <div className="flex flex-row items-center space-x-6 w-[75%]">

                <input type="text"
                    className="border-[1px] py-2 px-3 w-1/2 outline-[rgb(24,119,242)] rounded-[8px]"
                    placeholder="Tìm kiếm sản phẩm theo tên ..."
                    onChange={(e) => {
                        debouncedHandleFindProduct(e.target.value)
                    }}
                />

                <div className="space-x-2 flex flex-row items-center">
                    <label className="font-medium">Sắp xếp theo:</label>
                    <div className={`cursor-pointer text-[#637381] 
                        py-2 px-3 rounded-[8px] justify-around 
                        w-[14rem] ${showSort ? "border-[rgb(24,119,242)] border-[1px] pointer-events-none" : "border-[1px]"} 
                        flex flex-row items-center relative `}
                        onClick={() => {
                                setShowSort(true)
                        }}
                    >
                        <span>{values[sortIndex].title}</span>
                        <MdKeyboardArrowDown />

                        {showSort &&
                            <ul className={`list-none absolute bg-white shadow-xl top-[41px] rounded-[8px]
                            transform transition-all duration-300 ease-in-out ${showSort && "pointer-events-auto"}`} ref={filterRef}>
                                {values?.map((value, index) => (
                                    <li key={index}
                                        className={`py-2 px-5 w-[14rem] first:rounded-t-[8px] last-rounded-b-[8px]
                                        ${index == sortIndex ? "bg-[rgb(237,244,254)]" : "hover:bg-[rgb(245,245,245)]"}`}
                                        onClick={(event) => handleSort(index, event)}
                                        value={value.value}>
                                        {value.title}
                                    </li>
                                ))}
                            </ul>
                        }

                    </div>


                </div>
            </div>

            <button className="flex flex-row items-center rounded-[8px]
            bg-[rgb(33,43,54)] text-white space-x-2 py-2 px-3"
                onClick={() => navigate("add")}
            >
                <FaPlus />
                <span>Thêm mới sản phẩm</span>
            </button>


        </div>
    )
}

export default FilterProduct
