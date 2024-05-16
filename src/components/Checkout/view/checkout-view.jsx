import { useTranslation } from "react-i18next"
import PageTitle from "../../Page-Title"
import CheckOutStepBar from "../checkout-step"
import { useEffect, useMemo, useState } from "react"
import CheckOutInformation from "../checkout-infor"
import CheckOutShippingMethod from "../checkout-shipping"
import CheckOutConfirm from "../checkout-confirm"
import { useScrollToTop } from "../../../hooks/use-scroll-to-top"
import HomePolicy from "../../Home/home-policy"

const CheckOutView = () => {

    const { t } = useTranslation("global")
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        useScrollToTop()
    }, [activeStep])

    const [information, setInformation] = useState(null)

    return (
        <div className="pb-8">
            <PageTitle title={t('page-title.checkout')} subtitle={t("page-title.checkout-sub")} />
            <CheckOutStepBar activeStep={activeStep} />
            {activeStep == 0 ?
                (<CheckOutInformation nextStep={() => setActiveStep(activeStep + 1)}
                    setInformation={(a) => setInformation(a)}
                />)
                : activeStep == 1 ?
                    (<CheckOutShippingMethod nextStep={() => setActiveStep(activeStep + 1)}

                    />)
                    :
                    (<CheckOutConfirm
                        information={information}

                    />)
            }

            <HomePolicy />
        </div>
    )
}

export default CheckOutView
