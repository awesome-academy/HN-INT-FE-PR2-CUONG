
const TopProduct = () => {

    const products = [
        {
            product_name: "Áo thun nam dành cho người đi lính oh no my queen Áo thun nam dành cho người đi lính oh no my queen",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },
        {
            product_name: "Áo thun nam",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },        {
            product_name: "Áo thun nam",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },
        {
            product_name: "Áo thun nam",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },        {
            product_name: "Áo thun nam",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },
        {
            product_name: "Áo thun nam",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },        {
            product_name: "Áo thun nam",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },
        {
            product_name: "Áo thun nam",
            product_image: "https://res.cloudinary.com/dwx2u4ugr/image/upload/v1716256072/ippagks7pzfs17uiodwv.jpg",
            sold: 2
        },
    ]

    return (
        <div className="w-full h-full bg-white px-6 py-4
            rounded-2xl drop-shadow-2xl space-y-6">
            <h2 className="font-black text-xl">Sản phẩm bán chạy</h2>

            <div className="flex flex-col w-full justify-center space-y-4">

                {/* header */}
                <div className="flex-row w-full flex font-medium">
                    <h2 className="w-[2rem] text-start">
                        #
                    </h2>
                    <h2 className="w-[280px]">
                        Tên sản phẩm
                    </h2>
                    <h2 className="w-[5rem] text-center">
                        Bán ra
                    </h2>
                </div>

                {/* body */}

                {products.map((product, index) => (
                    <div key={index} className="flex flex-row items-center">
                        <p className="w-[2rem] text-start">
                            {index + 1}
                        </p>
                        <div className="flex flex-row w-[280px] space-x-2 items-center">
                            <img src={product?.product_image} alt="" 
                                className="w-[54px] h-[54px] rounded-xl shadow-md"
                            />
                            <p className="font-medium text-ellipsis overflow-hidden h-[50px]">{product?.product_name}</p>
                        </div>
                        <p className="w-[5rem] text-center font-medium">
                            {product?.sold}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default TopProduct
