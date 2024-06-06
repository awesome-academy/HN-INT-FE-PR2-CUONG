import FilterOrder from "./filter-order"
import ListOrder from "./list-order"

const MainOrder = () => {
    return(
        <div className="max-w-screen-xl w-full space-y-8">
        <p className="text-center font-bold text-2xl">Quản lý đơn hàng</p>
        <div>
            <FilterOrder/>
            <ListOrder/>
        </div>
    </div>
    )
}

export default MainOrder
