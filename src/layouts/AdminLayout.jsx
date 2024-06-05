import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useSidebarStore } from "../states/sidebar"
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = ({ children }) => {

    const { sideBarOpen, toggleSideBar } = useSidebarStore()

    return (
        <>
            <div className="flex flex-row relative bg-[rgb(249,250,251)]">
                <AdminNavbar sideBarOpen={sideBarOpen} />
                <div className={`relative transform transition-all duration-300
                ${sideBarOpen ? "w-[calc(100%-280px)]" : "w-full"}`}>
                    <AdminHeader toggle={toggleSideBar} />
                    <div className="px-4 w-full flex justify-center">
                        {children}
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default AdminLayout
