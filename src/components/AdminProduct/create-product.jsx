import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { IoArrowBackOutline, IoCloseOutline } from 'react-icons/io5'
import { RiImageAddLine } from 'react-icons/ri'
import { useState } from 'react'
import Loading from '../Loading'
import CreateProductItem from './create-product-item'
import { useProductStore } from '../../states/products'
import { toast } from 'react-toastify'
import { toastOption } from '../../utils/toastify'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/shoes.jpg'


const CreateProduct = () => {
    const schema = z.object({
        product_name: z.string().min(1, "Tên sản phẩm không được để trống!"),
        price: z.number().min(100, "Giá sản phẩm không được để trống!"),
        product_image: z.string().min(1, "Hình ảnh sản phẩm không được để trống!"),
        description: z.string().min(5, "Mô tả sản phẩm cần tối thiểu 5 kí tự"),
        sale: z.number(),
        gender: z.string(),
        category: z.string(),
        brand: z.string(),
    })

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            sale: 0,
            gender: "male",
            category: "shoes",
            brand: "nike"
        }
    })

    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImage = async (event) => {
        setLoading(true)
        const uploadFile = event.target.files[0]
        if (!uploadFile) {
            return
        }
        setImage(img)
        setValue("product_image", img)
        setLoading(false)
    }
    const handleRemoveImage = async () => {
        setImage(null)
    }

    const [productItems, setProductItems] = useState([])
    const [items, setItems] = useState(1)

    const { createProduct } = useProductStore()

    const handleCreateProduct = async (data) => {
        await createProduct({...data, productItems})
        toast.success("Tạo sản phẩm thành công!", toastOption)
        reset({
            product_image: "",
            product_name: "",
            description: "",
            sale: 0,
        })
        setImage(null)
        setItems(0)
        setProductItems([])
    }
    const navigate = useNavigate()

    return (
        <div className="max-w-screen-lg w-full space-y-8">
            <p className="text-center font-bold text-2xl relative">
                <IoArrowBackOutline className='absolute cursor-pointer left-12 top-2'
                    onClick={() => navigate(-1)}
                />
                Tạo mới sản phẩm
            </p>
            <div className="flex flex-col justify-start space-y-6 bg-white p-12 rounded-md shadow-lg">
                <div className='space-y-1 text-start'>
                    <div className="flex flex-row items-center space-x-1">
                        <label className="w-[6.5rem] text-gray-600 font-semibold">Tên sản phẩm:</label>
                        <input type="text" placeholder='Nhập tên sản phẩm tại đây ...'
                            className="flex-grow py-2 px-4 border border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md"
                            {...register("product_name")}
                            onChange={(e) => setValue("product_name", e.target.value)}
                        />
                    </div>
                    {errors?.product_name && <p className="text-red-500 text-[14px]">{errors.product_name?.message}</p>}
                </div>

                <div className='space-y-1 text-start flex flex-row space-x-20'>
                    <div className='w-1/3'>
                        <div className="flex flex-row items-center space-x-1">
                            <label className="w-[6.5rem] text-gray-600 font-semibold">Hình ảnh:</label>
                            {image ?
                                (<div className="w-[10rem] h-[10rem] relative">
                                    <IoCloseOutline className="w-[2rem] h-[2rem] absolute right-0 z-10 top-0 cursor-pointer"
                                        onClick={handleRemoveImage}
                                    />
                                    <img className="w-full max-w-[10rem] max-h-[10rem] h-full object-cover object-center rounded-xl shadow-lg"
                                        src={image} alt="null" lazy />
                                </div>) :
                                (loading ? <div className="w-[10rem] h-[10rem] flex justify-center items-center"><Loading /></div>
                                    : <div className="flex flex-col relative h-[10rem] space-y-2 justify-center items-center w-[10rem] px-2 py-4 border-dashed border">
                                        <RiImageAddLine className="w-[3rem] h-[3rem]" />
                                        <p className="font-bold opacity-50">Chọn ảnh</p>
                                        <input type="file" accept="image/*"
                                            {...register("product_image")}
                                            onChange={handleImage}
                                            className="cursor-pointer h-full w-full absolute inset-0 opacity-0 z-10"
                                        />
                                    </div>)}
                        </div>
                        {errors?.product_image && <p className="text-red-500 text-[14px]">{errors?.product_image?.message}</p>}
                    </div>

                    <div className='w-2/3 flex flex-row items-center space-x-4'>
                        <label className="w-fit text-gray-600 font-semibold">
                            Danh mục sản phẩm:
                        </label>
                        <div className='flex flex-col space-y-4'>

                            <div className='flex flex-row space-x-2 items-center'>
                                <label className="w-[5rem] text-gray-600 font-semibold">
                                    Giới tính:
                                </label>
                                <select
                                    className="border border-gray-300 outline-[rgba(24,119,242,0.3)] 
                                    rounded-md px-4 py-2 w-[8rem]"
                                    {...register("gender")}
                                    onChange={(e) => setValue("gender", e.target.value)}
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="kid">Trẻ em</option>
                                </select>
                            </div>

                            <div className='flex flex-row space-x-2 items-center'>
                                <label className="w-[5rem] text-gray-600 font-semibold">
                                    Phân loại:
                                </label>
                                <select
                                    className="border border-gray-300 outline-[rgba(24,119,242,0.3)] 
                                    rounded-md px-4 py-2 w-[8rem]"
                                    {...register("category")}
                                    onChange={(e) => setValue("category", e.target.value)}
                                >
                                    <option value="shoes">Giày</option>
                                    <option value="clothes">Quần áo</option>
                                    <option value="accessories">Phụ kiện</option>
                                </select>
                            </div>

                            <div className='flex flex-row space-x-2 items-center'>
                                <label className="w-[5rem] text-gray-600 font-semibold">
                                    Nhãn hiệu:
                                </label>
                                <select
                                    className="border border-gray-300 outline-[rgba(24,119,242,0.3)] 
                                    rounded-md px-4 py-2 w-[8rem]"
                                    {...register("brand")}
                                    onChange={(e) => setValue("brand", e.target.value)}
                                >
                                    <option value="nike">Nike</option>
                                    <option value="adidas">Adidas</option>
                                </select>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='flex flex-row w-full space-x-6'>
                    <div className='space-y-1 text-start w-1/2'>
                        <div className="flex flex-row w-full items-center space-x-1">
                            <label className="w-[6.5rem] text-gray-600 font-semibold">Giá hiển thị:</label>
                            <input type="number" placeholder='Nhập giá (nghìn đồng)'
                                className="flex-grow py-2 px-4 border border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md"
                                {...register("price", {
                                    setValueAs: (value) => Number(value)
                                })}
                                onChange={(e) => setValue("price", e.target.value)}
                            />
                        </div>
                        {errors?.price && <p className="text-red-500 text-[14px]">{errors?.price?.message}</p>}
                    </div>

                    <div className='space-y-1 text-start w-1/2'>
                        <div className="flex flex-row w-full items-center space-x-1">
                            <label className="w-fit text-gray-600 font-semibold">Giảm giá (%):</label>
                            <input type="number" placeholder='Giảm giá (%)'
                                className="w-[4rem] text-center py-2 px-4 border border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md"
                                {...register("sale", {
                                    setValueAs: (value) => Number(value)
                                })}
                                onChange={(e) => setValue("sale", e.target.value)}
                            />
                        </div>
                        {errors?.sale && <p className="text-red-500 text-[14px]">{errors?.sale?.message}</p>}
                    </div>
                </div>

                <div className='space-y-1 text-start'>
                    <div className="flex flex-row w-full items-center space-x-1">
                        <label className="w-[6.5rem] text-gray-600 font-semibold">Mô tả:</label>
                        <textarea placeholder='Nhập mô tả sản phẩm ... (Tối thiểu 5 kí tự)'
                            rows={5}
                            className="flex-grow py-2 px-4 border border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md"
                            {...register("description")}
                            onChange={(e) => setValue("description", e.target.value)}
                        />
                    </div>
                    {errors?.description && <p className="text-red-500 text-[14px]">{errors?.description?.message}</p>}
                </div>

                <p className="text-lg w-full text-center font-black">Biến thể sản phẩm</p>
                <table className="table-auto w-full">
                    <thead className="h-[50px] text-[#637381]">
                        <tr>
                            <th className="w-[12%] text-center font-medium">Hình ảnh</th>
                            <th className="w-[12%] text-center font-medium">Giá</th>
                            <th className="w-[12%] text-center font-medium">Giảm giá</th>
                            <th className="font-medium w-[12%] text-center">Màu sắc</th>
                            <th className="font-medium w-[25%] text-center">Kích thước</th>
                            <th className="font-medium w-[10%] text-start">Trong kho</th>
                            <th className="flex-grow font-medium">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="h-0">
                        {Array.from({ length: items }).map((_, index) => (
                            <CreateProductItem
                                index={index}
                                item={productItems[index]}
                                createItem={(newItem) => {
                                    setProductItems([...productItems, productItems[index] = newItem])
                                    setValue("product_items", productItems)
                                }}
                                removeItem={() => {
                                    setProductItems(productItems.filter((_, i) => i !== index))
                                    setItems(items - 1)
                                }}
                                updateItem={(item) => {
                                    const newProductItems = [...productItems];
                                    newProductItems[index] = item;
                                    setProductItems(newProductItems);
                                }}
                            />
                        ))}
                        <tr>
                            <td colSpan={7}>
                                <div className='w-full flex flex-row text-[rgb(75,85,99)]
                                    hover:text-black items-center space-x-4 cursor-pointer'
                                    onClick={() => setItems(items + 1)}
                                >
                                    <div className='flex-grow h-1
                                    border-t-2 border-dashed'></div>
                                    <span className='text-[14px]'>Thêm biến thể</span>
                                    <div className='flex-grow h-1 
                                    border-t-2 border-dashed'></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className='bg-[rgb(33,43,54)]
                 text-white w-[14rem] font-bold rounded-md p-4 mx-auto'
                    onClick={handleSubmit(handleCreateProduct)}
                >
                    Tạo sản phẩm
                </button>
            </div>
        </div>

    )
}

export default CreateProduct
