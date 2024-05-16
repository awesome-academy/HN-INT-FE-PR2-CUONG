import { useEffect } from "react"
import FilterUser from "./filter-user"
import ListUser from "./list-user"

const MainUserView = () => {

    return(
        <div className="max-w-screen-xl w-full space-y-8">
            <p className="text-center font-bold text-2xl">Quản lý người dùng</p>
            <div>
                <FilterUser/>
                <ListUser/>
            </div>
        </div>
    )
}

export default MainUserView
