import { BarChart, axisClasses } from "@mui/x-charts"
import AreaView from "./area-view"
import { formatPrice } from "../../utils/format";
import Legend from "./legend";

const WeeklySale = () => {

    const clothesData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const shoesData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const accessoriesData = [1400, 2398, 2800, 2908, 1800, 6800, 0];
    const xLabels = [
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7',
        'CN',
    ];

    const series = [
        { data: clothesData, label: 'Quần áo', id: 'clothesId', stack: 'total', color: '#FF6347'},
        { data: shoesData, label: 'Giày', id: 'shoesId', stack: 'total', color: '#4682B4' },
        { data: accessoriesData, label: 'Phụ kiện', id: 'accesoriesId', stack: 'total', color: '#32CD32'},
    ]

    return (
        <AreaView title={"Thu nhập tuần này"}>
            <div className="-translate-y-14 transition-all relative">
                <BarChart
                    width={500}
                    height={300}
                    series={series.map((series) => ({
                        ...series,
                        valueFormatter: (v) => (v === null ? '' : formatPrice(v)),
                      }))}
                    xAxis={[{ data: xLabels, scaleType: 'band', categoryGapRatio: 0.7 }]}
                    yAxis={[{
                        label: "Triệu đồng",
                        valueFormatter: v => v/1000
                    }]}
                    legend={{hidden:true}}
                    grid={{horizontal:true}}
                    sx={{
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
                            transform: 'translate(-12px, 0px)',
                            fontSize: "18px",
                            fontWeight: 600,
                        },
                    }}
                />
                <Legend items={series} type={"row"}/>
            </div>
        </AreaView>
    )
}

export default WeeklySale
