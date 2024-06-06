import AreaView from "./area-view"
import { formatStar, formatDate } from "../../utils/format"
import { AiFillStar } from "react-icons/ai"

const RecentlyComment = () => {
    const comments = [
        {
            id: 1,
            user_name: "Pemond",
            comment: "Sản phẩm rất tốt, chất lượng đảm bảo, everything is perfect nasndask buqwbd iwqbd iwb dasbdi absid bi",
            product_name: "Giày Nike 404 SOS",
            user_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1715076914/avatars/1_zriyqx.jpg",
            rating: 5,
            createdAt: new Date()
        },
        {
            id: 1,
            user_name: "Pemond",
            comment: "Sản phẩm rất tốt, chất lượng đảm bảo, everything is perfect nasndask buqwbd iwqbd iwb dasbdi absid bi",
            product_name: "Giày Nike 404 SOS",
            user_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1715076914/avatars/1_zriyqx.jpg",
            rating: 5,
            createdAt: new Date()
        },
        {
            id: 1,
            user_name: "Pemond",
            comment: "Sản phẩm rất tốt, chất lượng đảm bảo, everything is perfect nasndask buqwbd iwqbd iwb dasbdi absid bi",
            product_name: "Giày Nike 404 SOS",
            user_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1715076914/avatars/1_zriyqx.jpg",
            rating: 5,
            createdAt: new Date()
        },
        {
            id: 1,
            user_name: "Pemond",
            comment: "Sản phẩm rất tốt, chất lượng đảm bảo, everything is perfect nasndask buqwbd iwqbd iwb dasbdi absid bi",
            product_name: "Giày Nike 404 SOS",
            user_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1715076914/avatars/1_zriyqx.jpg",
            rating: 5,
            createdAt: new Date()
        },

    ]

    return (
        <AreaView title={"Đánh giá gần đây"} >
            <div className="w-[500px] flex flex-col space-y-6">
                {comments?.map((comment, index) => (
                    <div key={index} className="flex flex-row items-start space-x-2">
                        <img src={comment?.user_image}
                            className="w-[40px] h-[40px] rounded-[50%]"
                        />
                        <div className="text-sm w-[340px]">
                            <p className="truncate">
                                <span className="font-bold">{comment?.user_name} </span>
                                đánh giá
                                <span className="font-bold"> {comment?.product_name}</span>
                            </p>
                            <p className="text-[12px] truncate">{comment?.comment}</p>
                        </div>
                        <div className="flex flex-col text-sm">
                            <div className="flex flex-row space-x-1">
                                <span className="font-semibold">{formatStar(comment?.rating)}</span>
                                <AiFillStar className="w-[1rem] h-[1.2rem] text-[rgb(244,189,98)]" />
                            </div>
                            <p className="text-[12px]">{formatDate(comment?.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </AreaView>
    )
}

export default RecentlyComment
