import { Helmet } from "react-helmet-async";
import { AdminHomeView } from "../components/AdminHome/view";

const AdminHomePage = () => {
    return (
        <>
            <Helmet>
                <title>Danh sách đơn hàng</title>
            </Helmet>
            
            <AdminHomeView/>
        </>
    )
}

export default AdminHomePage
