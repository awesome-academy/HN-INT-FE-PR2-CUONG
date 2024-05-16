import { useTranslation } from "react-i18next"
import slide1 from "../../assets/slide/slide1.jpg"
import slide2 from "../../assets/slide/slide2.jpg"
import slide3 from "../../assets/slide/slide3.jpg"
import slide4 from "../../assets/slide/slide4.jpg"
import { useEffect, useState } from "react"

const AuthSlide = () => {

    const { t } = useTranslation("global")

    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => prev < 3 ? prev + 1 : 0)
        }, 4000)
        return () => clearInterval(interval)
    }, [activeSlide])

    const slides = [
        {
            img: slide1,
            description: t("slide.description1"),
            author: "Phạm Minh Tuấn Anh",
            job: t("slide.job1")
        },
        {
            img: slide2,
            description: t("slide.description1"),
            author: "Phạm Minh Tuấn Anh",
            job: t("slide.job2")
        },
        {
            img: slide3,
            description: t("slide.description3"),
            author: "Phạm Minh Tuấn Anh",
            job: t("slide.job3")
        },
        {
            img: slide4,
            description: t("slide.description4"),
            author: "Phạm Minh Tuấn Anh",
            job: t("slide.job4")
        }
    ]

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full h-fit relative">
                <div className="w-full h-full flex flex-col justify-center md:max-h-[980px]">
                    <img className=" h-fit lg:w-full lg:min-h-[825px] lg:max-h-none md:max-h-[40rem] sm:max-h-[30rem] max-h-[20rem]" src={slides[activeSlide]?.img} alt="" />
                    <div className="sm:px-6 px-2 w-full absolute z-10 bottom-0 text-white">
                        <div className="bg-[rgba(0,0,0,0.2)]
                         h-fit w-full sm:px-4 px-2 md:text-xl shadow-xl sm:py-6 py-2"
                            style={{backdropFilter: "blur(30px)"}}
                         >
                            <p className="font-semibold opacity-90 md:text-lg text-sm">" {slides[activeSlide]?.description}"</p>
                            <p className="mt-4 md:text-2xl text-lg font-bold">{slides[activeSlide]?.author}</p>
                            <p className="md:text-xl text-[15px] font-medium">{slides[activeSlide]?.job}</p>
                        </div>

                        <div className="w-full flex flex-row">
                            {slides.map((_ ,index) => (
                                <div key={index} className={`w-1/4 sm:h-3 h-1 ${activeSlide == index ? "bg-[rgb(245,189,98)]" : "bg-[rgb(230,230,230)]"} mx-1 my-2`}></div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthSlide
