import HotCategory from "./hot-category"
import MonthGoal from "./monthly-goal"
import RecentlyComment from "./recently-comment"
import TodayOverview from "./today-overview"
import TopProduct from "./top-product"
import UserCity from "./user-city"
import WeeklySale from "./weekly-sale"

const HomeMain = () => {
    return (
        <div className="max-w-screen-2xl w-full flex justify-center">
            <div className="flex flex-col w-full justify-start 
           space-y-8 p-4">
                <h4 className="text-2xl">
                    Chào mừng trở lại 👋 <span className="font-bold">Phạm Minh Tuấn Anh</span>
                </h4>

                <div className="flex flex-row space-x-8">
                    <div className="w-3/5">
                        <TodayOverview />
                    </div>
                    <div className="w-2/5">
                        <HotCategory />
                    </div>
                </div>

                <div className="flex w-full flex-row space-x-8">
                    <div className="w-2/3 flex flex-col space-y-8">
                        <div className="w-full flex flex-row space-x-8">
                            <div className="w-1/2">
                                <WeeklySale />
                            </div>
                            <div className="w-1/2">
                                <MonthGoal />
                            </div>
                        </div>
                        <div className="w-full flex flex-row space-x-8">
                            <div className="w-1/2">
                                <UserCity />
                            </div>
                            <div className="w-1/2">
                                <RecentlyComment />
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3 flex justify-end">
                        <div className="h-full flex w-[93%]">
                            <TopProduct />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default HomeMain
