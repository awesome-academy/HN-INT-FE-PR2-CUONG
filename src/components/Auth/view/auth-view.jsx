import { useEffect, useState } from "react"
import AuthLogin from "../auth-login"
import AuthSlide from "../auth-slide"
import AuthSignup from "../auth-signup"
import { useScrollToTop } from "../../../hooks/use-scroll-to-top"
import AuthInfor from "../auth-infor"
import { ToastContainer } from "react-toastify"
import { useUserAuthentication } from "../../../hooks/use-user-authentication"

const AuthView = () => {

    const [activePart, setActivePart] = useState("login")
    
    useEffect(() => {
        useScrollToTop()
    }, [activePart])

    useUserAuthentication()

    const [userData, setUserData] = useState(null)

    return (
        <div className="w-full h-screen flex justify-center"
        >
            <div className="w-full h-full max-w-[1800px] md:p-6 p-3 py-2 flex lg:flex-row flex-col
                    md:justify-between items-center lg:space-x-6">
                <div className="lg:w-1/2 w-full h-full lg:pb-0 pb-4">
                    {activePart == "login" ?
                        (<AuthLogin signup={() => setActivePart("signup")}/>)
                        :
                        activePart == "signup" ? 
                            (<AuthSignup login={() => setActivePart("login")} 
                                         infor={() => setActivePart("profile")}
                                         userData={(data) => setUserData(data)}
                            />) 
                            : 
                            (<AuthInfor userData={userData}  login={() => setActivePart("login")}/>)
                    }
                </div>
                <div className="lg:w-1/2 w-full h-full lg:pb-0 pb-4">
                    <AuthSlide />
                </div>
            </div>
            <ToastContainer/>
        </div>
    )

}

export default AuthView
