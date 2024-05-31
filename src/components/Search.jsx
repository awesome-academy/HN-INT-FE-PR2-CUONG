import { useTranslation } from "react-i18next"
import { useSidebarStore } from "../states/sidebar"
import { useCallback, useEffect, useRef, useState } from "react"
import { debounce } from "lodash"
import { getSearchProducts } from "../services/product"
import { formatPrice } from "../utils/format"
import { AiFillStar } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const Product = ({ product, close }) => {
    const navigate = useNavigate()
    return (
        <div className="w-full flex flex-row text-black 
        space-x-4 p-3 bg-[rgb(229,231,235)] hover:cursor-pointer
         hover:bg-[rgb(195,198,205)] first:rounded-t-[10px] last:rounded-b-[10px]
         "
            onClick={() => {
                close()
                navigate('/product/' + product?.id)
            }
            }
        >
            <img src={product?.product_image} className="w-[4rem] h-[6rem]" alt="" />
            <div className="flex flex-col justify-between">
                <p className="sm:text-xl text-base font-medium">{product?.product_name}</p>
                <p className="sm:text-xl text-base font-bold">{formatPrice(product?.price)}</p>
                <div className="flex flex-row items-center">
                    <AiFillStar className="w-[1.5rem] h-[1.7rem] text-[rgb(244,189,98)]" />
                    <span className="ml-2 font-medium sm:text-xl text-base">{product?.rating}</span>
                </div>
            </div>
        </div>
    )
}

const SearchView = () => {
    const { searchOpen, closeSearch } = useSidebarStore()
    const { t } = useTranslation("global")
    const searchRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current?.contains(event.target)) {
                closeSearch()
                setKeyWord("")
                setProducts([])
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const [products, setProducts] = useState([])
    const [keyword, setKeyWord] = useState("")

    const debouncedSearchProduct = useCallback(
        debounce(async (keyword) => {
            if (keyword) {
                const response = await getSearchProducts(keyword);
                setProducts(response);
            }
        }, 500),
        []
    );


    return (
        <div className={`fixed w-full top-0 left-0 bg-white z-[50] transform sm:min-h-[70px]
                transition-all flex px-4 py-4 flex-col items-center justify-center ${searchOpen ? "shadow-sm" : "-translate-y-full"}
        `} ref={searchRef}>
            <div className="max-w-screen-md w-full flex flex-col items-center justify-center space-y-4">
                <input
                    type="text"
                    className="border-2 w-full sm:p-3 p-2 outline-[rgb(62,24,0)] font-medium sm:text-lg"
                    placeholder={t("search")}
                    value={keyword}
                    onChange={(e) => {
                        setKeyWord(e.target.value)
                        debouncedSearchProduct(e.target.value);
                    }}
                />
                {keyword ?
                    !products?.length
                    ? <p className="sm:text-lg text-sm text-center text-wrap">{t("no-search")} <span className="font-semibold">{keyword}</span></p>
                    :
                    <div className="flex flex-col w-full space-y-1 overflow-auto">
                        {Array.isArray(products) &&
                            products?.map((product, index) => (
                                <Product key={index} product={product} close={closeSearch} />
                            ))}
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default SearchView
