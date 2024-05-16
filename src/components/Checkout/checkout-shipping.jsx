import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa6'
import paymentImg from "../../assets/payment-img.jpg"

const CheckOutShippingMethod = ({ nextStep }) => {

    const { t } = useTranslation("global")

    const handleNextStep = () => {

        nextStep()
    }

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-2xl w-full flex flex-col justify-center items-center space-y-6 lg:px-1 px-3">
                <img src={paymentImg} className='w-[20rem] h-[20rem] rounded-[50%]' alt="" />
                <p className='sm:text-xl text-sm text-center font-medium sm:px-0 px-5'>{t("checkout.payment")}</p>
                <button className={`md:w-fit mx-auto flex flex-row items-center justify-center
                 text-white md:min-w-[25rem] w-full px-4 sm:py-5 py-2 h-fit 
                sm:text-xl font-bold bg-[rgb(62,24,0)]`
                }
                    onClick={handleNextStep}
                >
                    {t("checkout.step3")}
                    <FaArrowRight className='mt-1 ml-2' />
                </button>
            </div>
        </div>
    )
}

export default CheckOutShippingMethod
