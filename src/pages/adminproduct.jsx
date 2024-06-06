import { Helmet } from "react-helmet-async";
import { AdminProductView } from "../components/AdminProduct/view";

const AdminProductPage = () => {
    return (
        <>
            <Helmet>
                <title>Danh sách sản phẩm</title>
            </Helmet>
            
            <AdminProductView/>
        </>
    )
}

export default AdminProductPage
