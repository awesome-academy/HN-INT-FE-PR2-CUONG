import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { useUserStorage } from "../../states/user";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";
import { FaUserPlus } from 'react-icons/fa6';


const CreateUser = ({onClose}) => {

    const schema = z.object({
        name: z.string().min(2, "Tên hiển thị cần tối thiểu 2 kí tự"),
        phone: z.string().min(10, "Số điện thoại có độ dài 10 hoặc 11 kí tự").max(11, "Số điện thoại có độ dài 10 hoặc 11 kí tự"),
        gender: z.string().min(1, "Vui lòng chọn giới tính"),
        role: z.string().min(1, "Vui lòng chọn chức vụ"),
        email: z.string().email("Email không hợp lệ").min(1, "Email không được để trống"),
        password: z.string().min(6, "Mật khẩu cần tối thiểu 6 kí tự")
    })

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    const {createUser} = useUserStorage()

    const handleCreate = async (data) => {
        const response = await createUser(data)
        if(response?.success == true){
            reset({
                name: "",
                phone: "",
                email: "",
                password: ""
            })
            onClose()
            toast.success("Tạo người dùng thành công", toastOption)
        }
        else{
            toast.error("Người dùng đã tồn tại", toastOption)
        }
    }

    return (
        <div className="h-full w-[22rem] flex justify-center 
        items-center flex-col space-y-2">
            <FaUserPlus className="w-[3rem] h-[3rem]" />
            <h3 className="text-lg font-black text-gray-800">Tạo người dùng mới</h3>
            <p className="text-[12px] text-center text-gray-500">
                Tạo ra người dùng mới trong hệ thống của bạn
            </p>

            <div className="flex flex-col justify-start w-full space-y-4">
                <div className="flex flex-row items-center space-x-2">
                    <p className="text-gray-500 text-sm font-medium w-[5.5rem]">Gmail:</p>
                    <input type="text"
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("email")}
                        onChange={(e) => setValue("email", e.target.value)}
                    />
                </div>
                {errors?.email && <p className="text-[red]">{errors?.email.message}</p>}

                <div className="flex flex-row items-center space-x-2">
                    <p className="text-gray-500 text-sm font-medium w-[5.5rem]">Mật khẩu:</p>
                    <input type="text"
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("password")}
                        onChange={(e) => setValue("password", e.target.value)}
                    />
                </div>
                {errors?.password && <p className="text-[red]">{errors?.password.message}</p>}

                <div className="flex flex-row items-center space-x-2">
                    <p className="text-gray-500 text-sm font-medium w-[5.5rem]">Tên hiển thị:</p>
                    <input type="text"
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("name")}
                        onChange={(e) => setValue("name", e.target.value)}
                    />
                </div>
                {errors?.name && <p className="text-[red]">{errors?.name.message}</p>}

                <div className="flex flex-row items-center space-x-2">
                    <p className="text-gray-500 text-sm font-medium w-[5.5rem]">Số điện thoại:</p>
                    <input type="text"
                        className="flex-grow border-[1px] rounded-md
                         outline-[rgba(24,119,242,0.3)] 
                         border-gray-300 px-2 py-1 text-[#637381]
                         "
                        {...register("phone")}
                        onChange={(e) => setValue("phone", e.target.value)}
                    />
                </div>
                {errors?.phone && <p className="text-[red]">{errors?.phone.message}</p>}

                <div className="flex flex-row items-center space-x-2 ">
                    <p className="text-gray-500 text-sm font-medium w-[5.5rem]">Giới tính:</p>
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
                    <p className="text-gray-500 text-sm font-medium w-[5.5rem]">Chức vụ:</p>
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
                {errors?.role && <p className="text-[red]">{errors?.role.message}</p>}

                <div className="flex gap-2 w-full">
                    <button className="py-2 px-4 bg-[rgba(24,119,242,0.3)]
                         text-[rgb(24,119,242)] font-semibold w-1/2 text-center rounded-xl shadow"
                        onClick={handleSubmit(handleCreate)}
                    >
                        Tạo người dùng
                    </button>
                    <button className="py-2 px-4 bg-[rgb(246,246,246)]
                         text-black font-semibold w-1/2 text-center rounded-xl shadow"
                        onClick={onClose}
                    >Hủy</button>
                </div>

            </div>

        </div>
    )
}

export default CreateUser
