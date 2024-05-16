import { useState } from "react"
import { FaEdit, FaUserEdit } from "react-icons/fa"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { apiUploadImage } from "../../services/images";
import Loading from "../Loading";
import { useUserStorage } from "../../states/user";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";

const UserEditModal = ({ user, onCloseEditModal }) => {

    const [image, setImage] = useState(user?.profileImg)
    const [loading, setLoading] = useState(false)

    const { updateUserData } = useUserStorage()

    const schema = z.object({
        name: z.string().min(2, "Tên hiển thị cần tối thiểu 2 kí tự"),
        phone: z.string().min(10, "Số điện thoại có độ dài 10 hoặc 11 kí tự").max(11, "Số điện thoại có độ dài 10 hoặc 11 kí tự"),
        gender: z.string().min(1, "Vui lòng chọn giới tính"),
        role: z.string().min(1, "Vui lòng chọn chức vụ")
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: user?.name,
            phone: user?.phone,
            gender: user?.gender,
            role: user?.role
        }
    })


    const handleImage = async (event) => {
        const uploadFile = event.target.files[0]
        if (!uploadFile) {
            return
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('image', uploadFile)
        const response = await apiUploadImage(formData)
        setImage(response?.img)
        setLoading(false)
    }

    const handleUpdate = async (data) => {
        const payload = {...user, ...data, profileImg: image}
        await updateUserData(payload)
        onCloseEditModal()
        toast.success("Cập nhật thành công!", toastOption)
    }
    


    return (
        <div className="h-full w-[22rem] flex justify-center 
        items-center flex-col space-y-2">
            <FaUserEdit className="w-[3rem] h-[3rem] text-[rgb(24,119,242)]" />
            <h3 className="text-lg font-black text-gray-800">Chỉnh sửa thông tin</h3>
            <p className="text-[12px] text-center text-gray-500">
                <span className="text-[rgb(212,36,36)] font-bold text-sm">Chú ý! </span>
                Bạn đang muốn chỉnh sửa thông tin của người dùng
                <span className="font-black"> {user?.email}</span>
            </p>

            <div className="flex flex-col justify-start w-full space-y-4">

                <div className="flex flex-row w-full h-[5rem] items-center space-x-2">
                    <p className="text-gray-500 text-sm font-medium w-[6rem]">Ảnh đại diện:</p>
                    {loading
                        ? (<div className="flex-grow flex justify-center items-center"><Loading /></div>)
                        : (
                            <div className="relative h-[5rem] w-[5rem] ">
                                <img className="w-full h-full rounded-[50%]" src={image} alt="avatar" />
                                <div className="w-[1.7rem] h-[1.7rem] bg-[rgb(62,24,0)] 
                                    absolute bottom-0 right-0 rounded-[50%] border-2 border-white
                                    text-white flex items-center justify-center cursor-pointer
                                ">
                                    <FaEdit className="" />
                                    <input type="file" accept="image/*"
                                        className="cursor-pointer h-full w-full absolute 
                                                    inset-0 z-10 opacity-0"
                                        onChange={handleImage}
                                    />
                                </div>
                            </div>
                        )}
                </div>

                <div className="flex flex-row items-center space-x-2">
                    <p className="text-gray-500 text-sm font-medium w-[6rem]">Tên hiển thị:</p>
                    <input type="text"
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("name")}
                        onChange={(e) => setValue("name", e.target.value)}
                    />
                </div>
                {errors?.name && <p className="text-[red] md:text-lg">{errors?.name.message}</p>}

                <div className="flex flex-row items-center space-x-2 ">
                    <p className="text-gray-500 text-sm font-medium w-[6rem]">Số điện thoại:</p>
                    <input type="text"
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("phone")}
                        onChange={(e) => setValue("phone", e.target.value)}
                    />
                </div>
                {errors?.phone && <p className="text-[red] md:text-lg">{errors?.phone.message}</p>}

                <div className="flex flex-row items-center space-x-2 ">
                    <p className="text-gray-500 text-sm font-medium w-[6rem]">Giới tính:</p>
                    <select
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("gender")}
                        onChange={(e) => setValue("gender", e.target.value)}
                    >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                {errors?.gender && <p className="text-[red] md:text-lg">{errors?.gender.message}</p>}

                <div className="flex flex-row items-center space-x-2 ">
                    <p className="text-gray-500 text-sm font-medium w-[6rem]">Chức vụ:</p>
                    <select
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("role")}
                        onChange={(e) => setValue("role", e.target.value)}
                    >
                        <option value="user">Người dùng</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                </div>
                {errors?.role && <p className="text-[red] md:text-lg">{errors?.role.message}</p>}


                <div className="flex gap-2 w-full">
                    <button className="py-2 px-4 bg-[rgba(24,119,242,0.3)]
                         text-[rgb(24,119,242)] font-semibold w-1/2 text-center rounded-xl shadow"
                        onClick={handleSubmit(handleUpdate)}
                    >
                        Cập nhật
                    </button>
                    <button className="py-2 px-4 bg-[rgb(246,246,246)]
                         text-black font-semibold w-1/2 text-center rounded-xl shadow"
                        onClick={onCloseEditModal}
                    >Hủy</button>
                </div>

            </div>

        </div>
    )
}

export default UserEditModal
