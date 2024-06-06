import { MdArrowBackIos, MdArrowForwardIos, MdDelete, MdEdit } from "react-icons/md"
import { formatDate } from "../../utils/format"
import { useEffect, useState } from "react"
import Modal from "../Modal"
import { useUserStorage } from "../../states/user"
import Loading from "../Loading"
import UserEditModal from "./edit-modal-user"
import { toast } from "react-toastify"
import { toastOption } from "../../utils/toastify"


const User = ({ user, removeUser }) => {
    const [openModal, setOpenModal] = useState(false)
    const handleDelete = async () => {
        await removeUser(user?.id, user?.account_id)
        setOpenModal(false)
        toast.success("Xóa người dùng thành công!", toastOption)
    }

    const [openEditModal, setOpenEditModal] = useState(false)

    return (
        <tr className="bg-white hover:bg-transparent h-[64px] text-[14px] border-t-[1px]">
            <td className="text-start pl-[24px] w-1/4 font-semibold ">
                <div className="flex flex-row items-center space-x-2">
                    <img src={user?.profileImg}
                        className="h-[40px] w-[40px] rounded-[50%]"
                        alt="" />
                    <span>
                        {user?.name}
                    </span>
                </div>
            </td>
            <td className="text-start w-1/5">{user.email}</td>
            <td className="text-center w-[10%]">{user.role == "user" ? "Người dùng" : "Quản trị viên"}</td>
            <td className="text-center w-[10%]">{user.gender == "male" ? "Nam" : "Nữ"}</td>
            <td className="text-center w-[14%]">{formatDate(user.createdAt)}</td>
            <td className="text-center w-[14%]">{formatDate(user.updatedAt)}</td>
            <td className="pr-[24px] ">
                <div className="flex justify-center space-x-2">
                    <div className="bg-[rgba(24,119,242,0.3)] p-2 rounded-[50%] cursor-pointer"
                        onClick={() => setOpenEditModal(true)}
                    >
                        <MdEdit className="w-[1.2rem] h-[1.2rem] text-[rgb(24,119,242)]" />
                    </div>
                    <div className="bg-[rgba(255,86,48,0.3)] p-2 rounded-[50%] cursor-pointer"
                        onClick={() => setOpenModal(true)}
                    >
                        <MdDelete className="w-[1.2rem] h-[1.2rem] text-[rgb(255,86,48)]" />
                    </div>
                </div>
            </td>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="w-56 h-full flex justify-center items-center flex-col space-y-2">
                    <MdDelete className="w-[3rem] h-[3rem] text-[rgb(255,86,48)]" />
                    <h3 className="text-lg font-black text-gray-800">Xóa người dùng</h3>
                    <p className="text-[12px] text-center text-gray-500">
                        Bạn có chắc là muốn xóa người dùng
                        <span className="font-black"> {user?.email}</span>
                    </p>
                    <div className="flex gap-2 w-full">
                        <button className="py-2 px-4 bg-[rgb(212,36,36)]
                         text-white font-semibold w-1/2 text-center rounded-xl shadow"
                            onClick={handleDelete}
                        >
                            Xóa
                        </button>
                        <button className="py-2 px-4 bg-[rgb(246,246,246)]
                         text-black font-semibold w-1/2 text-center rounded-xl shadow"
                            onClick={() => setOpenModal(false)}>Hủy</button>
                    </div>
                </div>
            </Modal>

            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <UserEditModal user={user} onCloseEditModal={() => setOpenEditModal(false)} />
            </Modal>

        </tr>
    )
}

const ListUser = () => {
    const { users, fetchUsersData, loading, removeUser } = useUserStorage()
    const [activeUser, setActiveUser] = useState(0)
    const [startUser, setStartUser] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            await fetchUsersData()
        }
        fetchData()
    }, [])

    useEffect(() => {
        setActiveUser(users?.length > 8 ? 8 : users?.length)
    }, [users])


    return (
        <table className="table-auto w-full">
            <thead className="h-[50px] w-full text-[14px] text-[#637381] ">
                <tr className="w-full ">
                    <th className="text-start pl-[24px] w-1/4 font-medium">Tên người dùng</th>
                    <th className="text-start w-1/5 font-medium">Gmail</th>
                    <th className="text-center w-[10%] font-medium">Chức vụ</th>
                    <th className="text-center w-[10%] font-medium">Giới tính</th>
                    <th className="text-center w-[14%] font-medium">Ngày tạo</th>
                    <th className="text-center w-[14%] font-medium">Ngày cập nhật</th>
                    <th className="text-center pr-[24px] font-medium">Thao tác</th>
                </tr>
            </thead>
            <tbody className="w-full">
                {loading
                    ? <tr className="w-full bg-white">
                        <td colSpan={7} className="text-center font-medium">
                            <div className="min-h-[20rem] flex justify-center items-center">
                                <Loading />
                            </div>
                        </td>
                    </tr>
                    : users?.length
                        ? <>
                            {Array.isArray(users) && users?.slice(startUser, activeUser)?.map((user, index) => (
                                <User key={index} user={user} removeUser={removeUser} />
                            ))}
                            <tr className="w-full bg-white px-6 h-[50px] text-[14px] border-t-[1px]">
                                <td colSpan={6} className="text-right font-medium pr-10">
                                    <p>{startUser + 1} - {activeUser} trên {users?.length}</p>
                                </td>
                                <td className="text-center font-medium pr-2">
                                    <div className="flex flex-row justify-center gap-1">
                                        <div className={`p-2 flex justify-center items-center
                                ${startUser ? "cursor-pointer rounded-[50%] hover:bg-[rgb(230,230,230)]"
                                                : "text-[#637381]"}
                            `}
                                            onClick={() => {
                                                if (startUser) {
                                                    setStartUser(startUser - 8)
                                                    if(startUser != activeUser -1){
                                                        setActiveUser(
                                                            activeUser - 8 > 8 ? activeUser - 8 : 8
                                                        )
                                                    }
                                                    else setActiveUser(activeUser -1 )
                                                }
                                            }}
                                        >
                                            <MdArrowBackIos />
                                        </div>
                                        <div className={`p-2 flex justify-center items-center
                                        ${activeUser < users?.length ? "rounded-[50%] hover:bg-[rgb(230,230,230)] cursor-pointer "
                                                : "text-[#637381]"}
                                        `}
                                            onClick={() => {
                                                if (activeUser < users?.length) {
                                                    setActiveUser(
                                                        activeUser + 8 < users?.length ? activeUser + 8 : users?.length
                                                    )
                                                    setStartUser(startUser + 8)
                                                }
                                            }}
                                        >
                                            <MdArrowForwardIos />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </>
                        : <tr className="w-full bg-white">
                            <td colSpan={7} className="text-center">
                                <div className="h-[14rem] w-full flex flex-col justify-center items-center">
                                    <h3 className="font-black text-xl my-4">Không tìm được!</h3>
                                    <p className="font-normal text-sm my-2 text-gray-500">
                                        Không có người dùng nào có chứa chuỗi bạn vừa nhập.
                                    </p>
                                    <p className="font-normal text-sm text-gray-500">
                                        Hãy thử kiếm tra lỗi chính tả hoặc 
                                        điền đầy đủ tên người dùng cần tìm.
                                    </p>
                                </div>
                            </td>
                        </tr>
                }
            </tbody>
        </table>
    )
}

export default ListUser
