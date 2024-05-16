import { useTranslation } from "react-i18next"
import { FaRegAddressCard } from "react-icons/fa6"
import { GiConfirmed } from "react-icons/gi"
import { MdPayment } from "react-icons/md"

const CheckOutStepBar = ({ activeStep }) => {
    const { t } = useTranslation("global")
    return (
        <section className="w-full flex justify-center items-center py-4">
            <div className="w-full max-w-screen-2xl py-4 lg:px-0 px-2">
                <div className="flex flex-row justify-center items-center w-full min-w-[20rem]">
                    <div className="flex flex-col items-center md:min-w-[216px]">
                        <div
                            className="sm:w-[3rem] sm:h-[3rem] w-[2.5rem] h-[2.5rem] 
                            bg-[rgb(230,230,230)] rounded-full flex justify-center items-center"
                            style={{
                                backgroundColor: activeStep === 0 ? "rgba(74,188,120,0.5)" : "rgb(74,188,120)",
                            }}
                        >
                            <FaRegAddressCard
                                className="w-[1.5rem] h-[1.5rem]"
                                style={{ color: activeStep === 0 ? "rgba(255,255,255, 0.8)" : "rgba(255,255,255,1)", }}
                            />
                        </div>
                        <span className="mt-2 text-center md:inline hidden text-xl"
                            style={{
                                fontWeight: activeStep === 0 ? "500" : "400",
                                color: activeStep === 0 ? "rgb(62,24,0)" : "rgb(74,188,120)"
                            }}
                        >
                            {t("checkout.step1")}
                        </span>
                    </div>
                    <div className="sm:w-1/5 w-1/4 h-1 bg-[rgb(230,230,230)]"
                        style={{ backgroundColor: activeStep > 0 ? "rgb(74,188,120)" : "" }}
                    ></div>


                    <div className="flex flex-col items-center md:min-w-[216px]">
                        <div className="sm:w-[3rem] sm:h-[3rem] w-[2.5rem] h-[2.5rem]
                         bg-[rgb(230,230,230)] rounded-full flex justify-center items-center"
                            style={{
                                backgroundColor: activeStep === 1 ? "rgba(74,188,120,0.5)" : activeStep > 1 ? "rgb(74,188,120)" : "",
                            }}>
                            <MdPayment className="w-[1.5rem] h-[1.5rem]" style={{ color: activeStep === 1 ? "rgba(255,255,255,0.8)" : activeStep > 1 ? "white" : "rgba(255,255,255,0.6)", }} />
                        </div>
                        <span className="mt-2 text-center md:inline hidden text-xl"
                            style={{ fontWeight: activeStep === 1 ? "500" : "400", color: activeStep > 1 ? "rgb(74,188,120)" : "" }}
                        >{t("checkout.step2")}</span>
                    </div>
                    <div className="sm:w-1/5 w-1/4 h-1 bg-[rgb(230,230,230)]" style={{ backgroundColor: activeStep > 1 ? "rgb(74,188,120)" : "" }}
                    ></div>
                    <div className="flex flex-col items-center md:min-w-[216px]">
                        <div className="sm:w-[3rem] sm:h-[3rem] w-[2.5rem] h-[2.5rem]
                         bg-[rgb(230,230,230)] rounded-full flex justify-center items-center"
                            style={{
                                backgroundColor: activeStep === 2 ? "rgba(74,188,120,0.5)" : "",
                            }}>
                            <GiConfirmed className="w-[1.5rem] h-[1.5rem]" style={{ color: activeStep === 2 ? "rgba(255,255,255, 0.8)" : "rgba(255,255,255,0.6)" }} />
                        </div>
                        <span className="mt-2 text-center md:inline hidden text-xl">
                            {t("checkout.step3")}
                        </span>
                    </div>
                </div>
                <p className="max-w-screen-2xl text-center lg:text-4xl text-2xl md:mt-12 mt-6 font-bold">
                    {activeStep == 0 ? t("checkout.step1") : activeStep == 1 ? t("checkout.step2") : t("checkout.step3")}
                </p>
            </div>
        </section>
    )
}

export default CheckOutStepBar
