import { FaHamburger, FaSearch } from "react-icons/fa"

const AdminHeader = ({toggle}) => {

    return(
        <div className="w-full h-[5rem] flex flex-row 
            items-center px-10 space-x-4 z-10 sticky top-0"
            style={{
                backdropFilter: "blur(5px)",
            }}
        >
            <FaHamburger className="text-[#637381] w-[20px] h-[20px] cursor-pointer "
                    onClick={toggle}
            />
            <FaSearch className="text-[#637381] w-[20px] h-[20px] cursor-pointer"/>
        </div>
    )
}

export default AdminHeader
