import { Helmet } from "react-helmet-async";
import { AdminOrderView } from "../components/AdminOrder/view";

const AdminOrderPage = () => {
    return (
        <>
            <Helmet>
                <title>Danh sách đơn hàng</title>
            </Helmet>
            
            <AdminOrderView/>
        </>
    )
}

export default AdminOrderPage
