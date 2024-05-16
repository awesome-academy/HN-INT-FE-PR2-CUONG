import { Helmet } from "react-helmet-async";
import { AdminUserView } from "../components/AdminUser/view";

const AdminUserPage = () => {
    return (
        <>
            <Helmet>
                <title>Danh sách người dùng</title>
            </Helmet>
            
            <AdminUserView/>
        </>
    )
}

export default AdminUserPage
