import { PieChart } from "@mui/x-charts"
import AreaView from "./area-view"
import Legend from "./legend"

const UserCity = () => {

    const data = [
        { value: 15, label: 'Hà Nội', color: 'rgb(24, 119, 242)'},
        { value: 7, label: 'Các tỉnh khác', color: 'rgb(255, 86, 48)' },
    ]

    return (
        <AreaView title={"Vị trí đặt hàng"}>
            <div className="w-full flex flex-row relative -translate-y-8">
                <PieChart
                    series={[
                        {
                            data: data,
                            innerRadius: 1,
                            outerRadius: 130,
                            paddingAngle: 1,
                        },
                        
                    ]}
                    width={500}
                    height={300}
                    legend={{ hidden: true }}
                />
                <div className="absolute right-1 top-20">
                    <Legend items={data} type={"col"}/>
                </div>
            </div>
        </AreaView>
    )
}

export default UserCity
