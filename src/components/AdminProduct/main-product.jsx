import FilterProduct from "./filter-product"
import ListProduct from "./list-product"

const MainProduct = () => {
    return (
        <div className="max-w-screen-xl w-full space-y-8">
            <p className="text-center font-bold text-2xl">Danh sách sản phẩm</p>
            <div>
                <FilterProduct />
                <ListProduct/>
            </div>
        </div>
    )
}

export default MainProduct
