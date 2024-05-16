import { useTranslation } from "react-i18next"
import PageTitle from "../../Page-Title"
import { useState } from "react"
import RequiredView from "../../Required"
import { useUserStorage } from "../../../states/user"
import AccountSideBar from "../account-sidebar"
import AccountPersonal from "../account-personal"
import HomePolicy from "../../Home/home-policy"
import AccountOrder from "../account-order"
import AccountAddress from "../account-address"
import AccountPassword from "../account-password"
import AccountLogout from "../account-logout"

const AccountView = () => {
    const { t } = useTranslation("global")
    const { user } = useUserStorage()

    const [activeContent, setActiveContent] = useState(0)

    const Content = activeContent == 0
        ? <AccountPersonal data={user} />
        : activeContent == 1
            ? <AccountOrder user_id={user?.id}/>
            : activeContent == 2 
                ? <AccountAddress 
                    name={user?.name} phone={user?.phone} id={user?.id}
                />
                : activeContent == 3 
                    ? <AccountPassword/>
                    : <AccountLogout/>

    return (
        <div className="py-10">
            <PageTitle title={t("page-title.account")} subtitle={t("page-title.account-sub")} />
            {user ?
                (
                    <div className="flex w-full justify-center">
                        <div className="w-full max-w-screen-2xl flex 
                    lg:flex-row flex-col justify-between py-8 2xl:px-0 px-2
                    lg:space-y-0 space-y-10
                    ">
                            <div className="lg:w-1/5 lg:min-w-[230px] w-full 
                        overflow-auto">
                                <AccountSideBar active={activeContent}
                                    changeActive={(index) => setActiveContent(index)} />
                            </div>
                            <div className="lg:w-3/4 w-full lg:pl-0">
                                {Content}
                            </div>
                        </div>
                    </div>
                )
                :
                (<RequiredView />)}
            <HomePolicy />
        </div>
    )
}

export default AccountView
