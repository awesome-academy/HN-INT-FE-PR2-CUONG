import { memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { createReview } from "../../services/product";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";

const ReviewItem = ({ item, t, user_id }) => {
    const schema = z.object({
        rating: z.number(),
        comment: z.string().min(10, t("review.comment-err"))
    })

    const {
        handleSubmit,
        setValue,
        reset,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            rating: 5,
            comment: ""
        }
    })

    const [hoverRating, setHoverRating] = useState(5);

    const handleMouseEnter = (index) => {
        setHoverRating(index + 1);
    };

    const handleMouseLeave = () => {
        setHoverRating(hoverRating);
        setValue("rating", hoverRating);
    };

    const handleClick = (index) => {
        setValue("rating", index + 1);
    }

    const handleReview = async (data) =>{
        const payload = {...data, product_id: item?.product_id, 
        user_id: user_id, review_image: [], createdAt: Date.now(), updatedAt: Date.now()}
        await createReview(payload)
        toast.success("Create Review Successfully", toastOption),
        reset()
        setHoverRating(5)
    }

    return (
        <div className="space-y-2 py-2 first:border-t-0 border-t">
            <p className="md:text-lg text-sm">{t("review.name")} {" "}
                <span className="font-bold">{item?.product_name}</span>
            </p>
            <div className="flex flex-row space-x-3 w-full overflow-x-auto">
                {Array.isArray(item?.product_images) && item?.product_images.map((image, index) => (
                    <img key={index} src={image} alt="product-image"
                        className="w-40 h-40 rounded-lg"
                    />
                ))}
            </div>
            <div className="space-y-3">
                <div className="space-y-2">
                    <p className="md:text-base text-sm">{t("review.rating")} <span className="text-red-500">*</span></p>
                    <div className="flex flex-row space-x-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar key={index}
                                className={`md:h-[1.5rem] h-[1.2rem] md:w-[1.5rem] w-[1.2rem]
                                cursor-pointer ${index + 1 <= hoverRating ? "text-[rgb(244,189,98)]" : "text-gray-300"}`}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="md:text-base text-sm">{t("review.review")} <span className="text-red-500">*</span></p>
                    <textarea className="border w-full p-2 md:text-base text-sm"
                        rows={5}
                        placeholder={t("review.review-ex")}
                        {...register("comment")}
                        onChange={(e) => setValue('comment', e.target.value)}
                    />
                    {errors?.comment && <p className="text-sm text-red-500">{errors?.comment?.message}</p>}
                </div>
                
                <button className="bg-[rgb(62,24,0)] text-white font-bold 
                         md:h-[4rem] h-[3rem] w-[10rem]"
                        onClick={handleSubmit(handleReview)}
                >
                    {t("review.btn")}
                </button>
            </div>
        </div>
    )
}

const CreateReview = ({ items, user_id }) => {
    const groupItems = items.reduce((acc, item) => {
        if (!acc[item.product_id]) {
            acc[item.product_id] = {
                product_id: item.product_id,
                product_name: item.product_name,
                product_images: []
            };
        }
        acc[item.product_id].product_images.push(item.product_image);
        return acc;
    }, {});
    const { t } = useTranslation("global")

    return (
        <div className="w-fit md:w-[48rem] max-w-screen-lg space-y-4 ">
            <h1 className="md:text-xl font-black text-center">{t("review.title")}</h1>
            <p className="md:text-lg text-sm text-center">{t("review.subtitle")}</p>
            <div className="max-h-[480px] overflow-auto">
                {Object.values(groupItems)?.map((item, index) => (
                    <ReviewItem key={index} item={item} t={t} user_id={user_id}/>
                ))}
            </div>
        </div>
    )
}

export default memo(CreateReview)
