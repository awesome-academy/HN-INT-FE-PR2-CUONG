import { MdClear, MdDelete, MdDone, MdEdit, MdOutlineCleaningServices } from 'react-icons/md'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { IoCloseOutline } from 'react-icons/io5'
import { RiImageAddLine } from 'react-icons/ri'
import { useState } from 'react'
import Loading from '../Loading'
import img from '../../assets/shoes.jpg'

const CreateProductItem = ({ item, createItem, removeItem, updateItem }) => {

    const schema = z.object({
        price: z.number().min(1, "Bắt buộc"),
        product_image: z.string().min(1, "Bắt buộc"),
        sale: z.number(),
        color: z.string(),
        size: z.union([z.string().min(1, "Bắt buộc"), z.number().min(1, "Bắt buộc")]),
        quantity: z.number().min(1, "Bắt buộc")
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
            quantity: 1,
            sale: 0,
            color: 'black',
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
    const [canEdit, setCanEdit] = useState(item ? false : true)
    const [edit, setEdit] = useState(false)

    const handleDone = (data) => {
        if(!edit){
            createItem(data)
        }
        else{
            updateItem(data)
        }
        setCanEdit(false)
    }

    return (
        <tr className="bg-white hover:bg-[rgb(249,250,251)] text-[16px] relative">
            <td className="w-[20%] font-medium text-center">
                <div className='flex flex-col justify-center py-2 items-center'>
                    {image ?
                        (<div className="w-[5rem] h-[5rem] relative">
                            {canEdit && <IoCloseOutline className="w-[1rem] h-[1rem] absolute right-0 z-10 top-0 cursor-pointer"
                                onClick={handleRemoveImage}
                            />}
                            <img className="w-full max-w-[5rem] max-h-[5rem] h-full object-cover object-center rounded-xl shadow-lg"
                                src={image} alt="null" lazy />
                        </div>) :
                        (loading ? <div className="w-[5rem] h-[5rem] flex justify-center items-center"><Loading /></div>
                            : <div className="flex relative h-[5rem] w-[5rem] space-y-2 justify-center items-center  px-2 py-4 border-dashed border">
                                <RiImageAddLine className="w-[2rem] h-[2rem]" />
                                <input required type="file" accept="image/*"
                                    {...register("product_image")}
                                    onChange={handleImage}
                                    className="cursor-pointer h-full w-full absolute inset-0 opacity-0 z-10"
                                />
                            </div>)}
                </div>
                {errors?.product_image && <p className="text-red-500 text-[14px]">{errors?.product_image?.message}</p>}
            </td>
            <td className="w-[12%] text-center font-medium space-y-2">
                <input type="number" required className={`w-[6rem] text-center p-2
                     border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md
                     ${canEdit ? "border" : "bg-transparent"}
                `}
                    disabled={!canEdit}
                    {...register("price", {
                        setValueAs: (value) => Number(value)
                    })}
                    onChange={(e) => {
                        setValue("price", e.target.value)
                    }
                    }
                />
                {errors?.price && <p className="text-red-500 text-[14px]">{errors?.price?.message}</p>}
            </td>
            <td className="w-[12%] text-center font-medium space-y-2">
                <input type="number" required className={`w-[3rem] text-center p-2
                     border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md
                     ${canEdit ? "border" : "bg-transparent"}
                `}
                    disabled={!canEdit}
                    {...register("sale", {
                        setValueAs: (value) => Number(value)
                    })}
                    onChange={(e) => setValue("sale", e.target.value)}
                />
                {errors?.sale && <p className="text-red-500 text-[14px]">{errors?.sale?.message}</p>}
            </td>
            <td className="font-medium w-[12%] space-y-2">
                <div className='rounded-full mx-auto w-[2.5rem] h-[2.5rem] 
                overflow-hidden flex items-center justify-center shadow-lg'>
                    <input
                        type="color" required
                        disabled={!canEdit}
                        className='w-[2.5rem] h-[2.5rem] rounded-md
                        border-none outline-none cursor-pointer'
                        {...register("color")}
                        onChange={(e) => setValue("color", e.target.value)}
                    />
                </div>
                {errors?.color && <p className="text-red-500 text-[14px]">{errors?.color?.message}</p>}
            </td>
            <td className="font-medium w-[25%] text-center space-y-2">
                <input type="text" required className={`w-[13rem] p-2 text-center
                    border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md ${canEdit ? "border" : "bg-transparent"}`}
                    disabled={!canEdit}
                    {...register("size")}
                    onChange={(e) => setValue("size", e.target.value)}
                />
                {errors?.size && <p className="text-red-500 text-[14px]">{errors?.size?.message}</p>}
            </td>
            <td className="font-medium w-[10%] text-start">
                <input type="number" required className={`w-[4rem] p-2 text-center
                    border-gray-300 outline-[rgba(24,119,242,0.3)] rounded-md ${canEdit ? "border" : "bg-transparent"}`}
                    disabled={!canEdit}
                    {...register("quantity", {
                        setValueAs: (value) => Number(value)
                    })}
                    onChange={(e) => setValue("quantity", e.target.value)}
                />
                {errors?.quantity && <p className="text-red-500 text-[14px]">{errors?.quantity?.message}</p>}
            </td>
            <td className="flex-grow">
                <div className='flex flex-row justify-center items-center space-x-2'>
                    {canEdit
                        ? (
                            <>
                                <div className="bg-[rgba(24,119,242,0.3)] p-2 rounded-[50%] cursor-pointer"
                                    onClick={handleSubmit(handleDone)}
                                >
                                    <MdDone className="w-[1.2rem] h-[1.2rem] text-[rgb(24,119,242)]" />
                                </div>
                                <div className="bg-[rgba(255,86,48,0.3)] p-2 rounded-[50%] cursor-pointer"
                                    onClick={() => reset()}
                                >
                                    <MdOutlineCleaningServices className="w-[1.2rem] h-[1.2rem] text-[rgb(255,86,48)]" />
                                </div>
                                <MdClear className='w-[1.2rem] h-[1.2rem] absolute 
                                left-0 cursor-pointer first:hidden'
                                    onClick={removeItem}
                                />
                            </>
                        )
                        : (
                            <>
                                <div className="bg-[rgba(24,119,242,0.3)] p-2 rounded-[50%] cursor-pointer"
                                    onClick={() => {
                                        setCanEdit(true)
                                        setEdit(true)
                                    }}
                                >
                                    <MdEdit className="w-[1.2rem] h-[1.2rem] text-[rgb(24,119,242)]" />
                                </div>
                                <div className="bg-[rgba(255,86,48,0.3)] p-2 rounded-[50%] cursor-pointer"
                                    onClick={removeItem}
                                >
                                    <MdDelete className="w-[1.2rem] h-[1.2rem] text-[rgb(255,86,48)]" />
                                </div>
                            </>
                        )
                    }
                </div>
            </td>
        </tr>
    )
}

export default CreateProductItem
