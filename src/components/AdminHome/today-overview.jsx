import AreaView from "./area-view"
import { formatPrice } from "../../utils/format"
import { IoBarChartSharp, IoDocument, IoPersonAdd } from "react-icons/io5"
import { IoIosPricetag } from "react-icons/io"

const TodayOverview = () => {
    return (
        <AreaView title={"Tổng quan hôm nay"}>
            <div className="w-full flex flex-row justify-between">

                <div className="w-[23%] p-4 flex flex-col space-y-4
                    bg-[rgb(255,226,230)] rounded-xl
                ">
                    <div className="w-[2.5rem] h-[2.5rem] flex rounded-[50%] 
                    justify-center items-center bg-[rgb(250,90,126)]">
                        <IoBarChartSharp className="w-[1.2rem] h-[1.2rem] text-white" />
                    </div>

                    <p className="font-semibold text-lg">{formatPrice(10000)}</p>
                    <p className="font-medium text-[15px]">Tổng tiền thu vào</p>
                    <p className="text-red-400 text-sm font-medium">
                        -8% so với hôm qua
                    </p>
                </div>

                <div className="w-[23%] p-4 flex flex-col space-y-4
                    bg-[rgb(255,244,222)] rounded-xl
                ">
                    <div className="w-[2.5rem] h-[2.5rem] flex rounded-[50%] 
                    justify-center items-center bg-[rgb(255,148,122)]">
                        <IoDocument className="w-[1.5rem] h-[1.5rem] text-white" />
                    </div>

                    <p className="font-semibold text-lg">5</p>
                    <p className="font-medium text-[15px]">Số lượng đơn hàng</p>
                    <p className="text-blue-400 text-sm font-medium">
                        +5% so với hôm qua
                    </p>
                </div>

                <div className="w-[23%] p-4 flex flex-col space-y-4
                    bg-[rgb(220,252,231)] rounded-xl
                ">
                    <div className="w-[2.5rem] h-[2.5rem] flex rounded-[50%] 
                    justify-center items-center bg-[rgb(61,216,88)]">
                        <IoIosPricetag className="w-[1.5rem] h-[1.5rem] text-white" />
                    </div>

                    <p className="font-semibold text-lg">8</p>
                    <p className="font-medium text-[15px]">Sản phẩm bán ra</p>
                    <p className="text-blue-400 text-sm font-medium">
                        +5% so với hôm qua
                    </p>
                </div>

                <div className="w-[23%] p-4 flex flex-col space-y-4
                    bg-[rgb(244,232,255)] rounded-xl
                ">
                    <div className="w-[2.5rem] h-[2.5rem] flex rounded-[50%] 
                    justify-center items-center bg-[rgb(191,131,255)]">
                        <IoPersonAdd className="w-[1.2rem] h-[1.2rem] text-white"/>
                    </div>

                    <p className="font-semibold text-lg">0</p>
                    <p className="font-medium text-[15px]">Người dùng mới</p>
                    <p className="text-red-400 text-sm font-medium">
                        -100% so với hôm qua
                    </p>
                </div>

            </div>
        </AreaView>
    )
}

export default TodayOverview
