import AreaView from "./area-view"
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const MonthGoal = () => {
    return (
        <AreaView title={"Tiến độ tháng"}>
            <div className="w-[500px] overflow-hidden">
                <Gauge
                    value={75}
                    width={500}
                    height={200}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 24,
                            fontWeight: 900,
                            transform: 'translate(0px, -20px)',
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: 'rgb(255,148,122)',
                        },
                    }}
                    text={
                        ({ value}) => `${value}%`
                    }
                />
            </div>
        </AreaView>
    )
}

export default MonthGoal
