import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import AreaView from "./area-view"
import {
    LineChart,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';
import { axisClasses } from "@mui/x-charts";
import { useState } from "react";
import Legend from "./legend";

const HotCategory = () => {

    const shoesData = [2, 3, 2, 1, 5, 0, 2, 4, 3, 2, 1, 5];
    const clothesData = [2, 1, 3, 2, 2, 1, 0, 1, 3, 2, 2, 1];
    const accessoriesData = [1, 2, 1, 0, 3, 2, 1, 2, 1, 0, 3, 0];
    const xLabels = ['T1','T2','T3','T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11','T12'];
    const series = [
        { data: clothesData, label: 'Quần áo', color: '#FF6347', id: 'clothesId' },
        { data: shoesData, label: 'Giày', color: '#4682B4', id: 'shoesId' },
        { data: accessoriesData, label: 'Phụ kiện', color: '#32CD32', id: 'accId' },
    ]

    const [year, setYear] = useState(new Date().getFullYear())

    return (
        <AreaView title={"Bán ra theo thể loại"}>
            <div className="-translate-y-14 relative transition-all">
                <LineChart
                    width={550}
                    height={300}
                    series={series}
                    yAxis={[{label: "Sản phẩm"}]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    sx={{
                        [`& .${lineElementClasses.root}`]: {
                            strokeWidth: 4,
                        },
                        [`& .${markElementClasses.root}`]: {
                            scale: '0.6',
                            strokeWidth: 2,
                        },
                        [`.${axisClasses.line}`]: {
                            display: 'none'
                        },
                        [`.${axisClasses.tick}`]: {
                            display: 'none'
                        },
                        [`.${axisClasses.left} .${axisClasses.tickLabel}`]: {
                            transform: 'translate(-5px, 0px)',
                            fontSize: "18px",
                            fontWeight: 600,
                        },
                        [`.${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translate(-10px, 0)',
                            fontSize: "18px",
                            fontWeight: 600,
                        },
                      
                    }}
                    legend={{ hidden: true }}
                    grid={{horizontal:true}}
                />
                <Legend items={series} type={"row"} />

                <div className="absolute top-1 right-1 
                    flex flex-row items-center space-x-2">
                    <button className="w-6 h-6 border rounded-[50%] pl-[2px] mt-[2px]"
                        onClick={() => setYear(year - 1)}
                    >
                        <IoChevronBack className="w-4 h-4" />
                    </button>
                    <input 
                        type="number" 
                        className="w-12 font-medium text-lg
                            text-center outline-[rgb(24,119,242)]" 
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    />
                    <button className="w-6 h-6 border rounded-[50%] pl-1 mt-[2px]"
                        onClick={() => setYear(year + 1)}
                    >
                        <IoChevronForward className="w-4 h-4" />
                    </button>
                    
                </div>
            </div>
        </AreaView>
    )
}

export default HotCategory
