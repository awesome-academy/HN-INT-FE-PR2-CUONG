import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import productImg from "../../assets/shoes.jpg";
import productImg1 from "../../assets/cocacola.jpg";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";
import { formatPrice, formatSortSize, originalPrice } from "../../utils/format";
import { useCartStore } from "../../states/cart";

// Start IMG
const ProductImg = ({listImg}) => {

    const [activeImg, setActiveImg] = useState(0);
    const imgRef = useRef(null);
    const handlePrevImg = () => {
        setActiveImg(activeImg - 1);
        imgRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "end",
        });
    };
    const handleNextImg = () => {
        setActiveImg(activeImg + 1);
        imgRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    };

    const handleImg = (index) => {
        const inlineValue = index > activeImg ? "start" : "end";
        setActiveImg(index);
        imgRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: inlineValue,
        });
    };

    const handleScroll = (e) => {
        const container = e.target;
        const containerWidth = container.getBoundingClientRect().width;
        const scrollPosition = container.scrollLeft / listImg.length;
        const imgWidth = containerWidth / listImg.length;
        const activeIndex = Math.round(scrollPosition / imgWidth);
        setActiveImg(activeIndex);
    };

    const [fullScreen, setFullScreen] = useState(false);

    const handleFullScreen = () => {
        const element = document.getElementById("img-container");
        setFullScreen(true);
        element.requestFullscreen();
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setFullScreen(false);
            }
        };

        document.addEventListener("fullscreenchange", handleFullScreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullScreenChange);
        };
    }, []);

    return (
        <div className="lg:w-1/2">
            <div className="relative w-full">
                <div
                    className={`absolute left-4 top-[50%] z-10
             w-fit -translate-y-1/2 cursor-pointer rounded-[50%] bg-[rgb(244,189,98)] p-4 shadow-md ${activeImg > 0 ? "hidden lg:block" : "hidden"}`}
                    onClick={handlePrevImg}
                >
                    <FaAngleLeft className="h-[2rem] w-[2rem]" />
                </div>

                <img
                    className="hidden  max-h-[830px] xl:h-[830px] h-auto w-full transition
                    duration-500 lg:block"
                    src={listImg[activeImg]}
                    alt="big image"
                />
                <div
                    id="img-container"
                    className="group/item relative flex items-center lg:hidden"
                >
                    <div
                        className="flex w-full snap-x snap-mandatory flex-row flex-nowrap items-center overflow-x-auto"
                        onScroll={handleScroll}
                    >
                        {listImg.map((item, index) => (
                            <img
                                key={index}
                                className={`h-full min-w-full snap-center ${fullScreen ? "" : "max-h-[400px] sm:max-h-[700px] md:max-h-[850px]"}
                                    group   transition duration-500`}
                                src={item}
                                alt="small image"
                                onClick={handleFullScreen}
                            />
                        ))}
                    </div>
                    <div
                        className="absolute bottom-4 right-4 block w-[5rem] rounded-2xl bg-white text-center 
                     text-base font-medium shadow-md sm:w-[8rem] sm:text-xl lg:hidden"
                    >
                        {activeImg + 1} / {listImg.length}
                    </div>
                </div>

                <div
                    className={`absolute right-4 top-[50%] z-10 
                w-fit -translate-y-1/2 cursor-pointer rounded-[50%] bg-white p-4 shadow-md ${activeImg === listImg.length - 1 ? "hidden" : "hidden lg:block"}`}
                    onClick={handleNextImg}
                >
                    <FaAngleRight className="h-[2rem] w-[2rem]" />
                </div>
            </div>
            <div className="mt-4 hidden w-full lg:block">
                <div className="flex w-full flex-nowrap overflow-hidden">
                    {listImg.map((item, index) => (
                        <div
                            key={index}
                            ref={activeImg === index ? imgRef : null}
                            className={`mr-2 h-fit max-h-[208px] min-h-[180px] min-w-[170px] cursor-pointer
                         ${activeImg == index ? "border-4 border-[rgb(62,24,0)] transition duration-500" : "border-4 border-transparent"}`}
                            onClick={() => handleImg(index)}
                        >
                            <img
                                className="max-h-[180px] lg:h-[180px] lg:w-[170px] h-auto w-full"
                                src={item}
                                alt="small image"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
// Done Img
// Start Infor

const Color = ({ color, index, active, setActiveColor }) => {
    return (
        <li
            className="flex cursor-pointer items-center"
            onClick={() => setActiveColor(index)}
        >
            <div
                className={`flex sm:h-[3rem] h-[2rem] w-[2rem] sm:w-[3rem] items-center justify-center rounded-[50%]
                 border-[2px] border-[rgb(230,230,230)] bg-white`}
                style={{ borderColor: active == index ? color : "rgb(230,230,230)" }}
            >
                <div
                    className={`sm:h-[2.5rem] h-[1.5rem] sm:w-[2.5rem] w-[1.5rem] rounded-[50%]`}
                    style={{ backgroundColor: color }}
                ></div>
            </div>
        </li>
    );
};

const Size = ({ size, index, active, setActiveSize }) => {
    return (
        <div
            className="mr-6 mt-4 flex w-1/5 min-w-[5rem] cursor-pointer items-center justify-center 
            border-2 px-4 sm:py-3 py-1 text-lg font-medium sm:min-w-[7.5rem] sm:text-2xl"
            style={{ backgroundColor: index == active ? "rgb(245,189,98)" : "" }}
            onClick={() => setActiveSize(index)}
        >
            {size}
        </div>
    );
};

const ProductInformation = ({ colors, sizes, items, product }) => {
    const { t } = useTranslation("global");
    const [activeColor, setActiveColor] = useState(null);
    const [activeSize, setActiveSize] = useState(null);
    const [inStock, setInStock] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [item, setItem] = useState(product);

    useEffect(() => {
        setItem(product)
    }, [product])

    useEffect(() => {
      const item = items.find(item => item.color == colors[activeColor] && item.size == sizes[activeSize])
      setInStock(item)
      setQuantity(1)
    }, [activeSize, activeColor])

    const {addToCart, addToWishList} = useCartStore()

    const handleAddQuantity = () => {
        if(quantity < inStock?.quantity) {
            setQuantity(quantity+1)
        }
        else{
            toast.error(t("product.stock.max") ,toastOption)
        }
    }

    const handleAddToCart = () => {
        if (!inStock?.quantity || activeSize == null || activeColor == null) {
            toast.error(t("toast.cart.err"), toastOption);
        } else {
            const item = {
                id: inStock?.id,
                quantity: quantity
             }
            addToCart(item)
            toast.success(t("toast.cart.success"), toastOption);
        }
    }

    const handleAddToWishList = () => {
        if (!inStock) {
            toast.error(t("toast.cart.err"), toastOption);
        } else {
            const item = {
                _id: inStock?._id,
                quantity: quantity
             }
            addToWishList(item)
            toast.success(t("toast.cart.success"), toastOption);    
        }
    }

    return (
        <div className="px-4 pt-5 lg:w-1/2 lg:px-0 lg:pl-6">
            <div className="w-full space-y-5">
                <h1 className="text-lg font-bold sm:text-3xl">{item?.product_name}</h1>
                <div className="flex flex-row space-x-6">
                    <h1 className="text-lg font-semibold sm:text-3xl">
                        {product?.sale == 0
                            ? formatPrice( inStock?.price || product?.price)
                            : originalPrice(product?.price, product?.sale)
                        }
                    </h1>
                    {product?.sale ?
                        <span className="text-black opacity-30 text-lg sm:text-3xl line-through ml-4">
                            {formatPrice(product?.price)}
                        </span> : null
                    }
                </div>
                <p className="hidden h-fit w-full text-wrap text-2xl opacity-70 lg:min-h-[140px] xl:block overflow-x-hidden">
                    {item?.description} 
                </p>
                <div className="space-y-3">
                    <p className="text-lg font-medium sm:text-2xl">
                        {t("product.color")}{" "}
                        <span className="font-normal capitalize opacity-90">
                            {" "}
                            {colors[activeColor]}
                        </span>
                    </p>
                    <ul className="flex flex-row space-x-4 overflow-x-auto lg:flex-wrap lg:overflow-x-hidden">
                        {colors.map((color, index) => (
                            <Color
                                key={index}
                                index={index}
                                color={color}
                                active={activeColor}
                                setActiveColor={setActiveColor}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-lg font-medium sm:text-2xl">
                        {t("product.size")}{" "}
                        <span className="font-normal capitalize opacity-90">
                            {" "}
                            {sizes[activeSize]}
                        </span>
                    </p>
                    <ul className="flex flex-row overflow-x-auto lg:flex-wrap lg:overflow-x-hidden">
                        {sizes.map((size, index) => (
                            <Size
                                index={index}
                                size={size}
                                active={activeSize}
                                setActiveSize={setActiveSize}
                            />
                        ))}
                    </ul>
                </div>

                <div className="flex h-[47px] items-center justify-between sm:max-w-[90%]">
                    <p className="w-fit cursor-pointer text-lg font-medium underline sm:text-2xl">
                        {t("product.view")}
                    </p>
                    <div
                        className={`w-fit border-2 px-4 py-2 text-lg sm:text-xl font-medium ${activeColor != null && activeSize != null ? "block" : "hidden"}`}
                        style={{
                            borderColor: inStock?.quantity ? "rgb(74,188,120)" : "rgb(158,0,2)",
                            color: inStock?.quantity ? "rgb(74,188,120)" : "rgb(158,0,2)",
                            backgroundColor: inStock?.quantity
                                ? "rgba(74,188,120,0.1)"
                                : "rgba(158,0,2,0.1)",
                        }}
                    >
                        {inStock?.quantity ? t("product.stock.in") : t("product.stock.out")}
                    </div>
                </div>

                <div className="flex flex-row items-center">
                    <span className="mr-4 text-lg font-medium sm:text-2xl">
                        {t("product.quantity")}
                    </span>
                    <button
                        className="sm:h-[4rem] h-[2rem] sm:w-[4rem] w-[3.5rem] border-[1px] text-center text-xl font-bold sm:text-2xl"
                        onClick={() => {
                            if (quantity > 1) setQuantity(quantity - 1);
                        }}
                    >
                        -
                    </button>
                    <input
                        className="sm:h-[4rem] h-[2rem] w-[3.5rem] border-[1px]  text-center text-xl font-bold sm:w-[10rem] sm:text-2xl"
                        type="text"
                        value={quantity}
                        Number
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <button
                        className="sm:h-[4rem] h-[2rem] sm:w-[4rem] w-[3.5rem]  border-[1px] text-center text-xl font-bold sm:text-2xl"
                        onClick={handleAddQuantity}
                    >
                        +
                    </button>
                </div>

                <div className="flex flex-row justify-between space-x-2 pb-5">
                    <button
                        className={`w-3/4  sm:py-4 py-2  text-lg font-bold
                     text-white sm:w-5/6 sm:text-2xl ${inStock?.quantity ? "bg-[rgb(62,24,0)]" : "bg-[rgba(62,24,0,0.5)] cursor-not-allowed"}`}
                        onClick={handleAddToCart}
                    >
                        {t("product.add")}
                    </button>
                    <button 
                    className="flex w-1/5 max-w-[5.2rem] items-center
                     justify-center border-[1px] sm:w-1/6"
                     onClick={handleAddToWishList}
                     >
                        <AiOutlineHeart className="h-[2rem] w-[2rem] sm:h-[3rem] sm:w-[3rem]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DetailInformation = ({ product }) => {

    return (
        <section className="h-fit w-full max-w-screen-2xl lg:px-4 2xl:px-0">
            <div className="flex w-full flex-col lg:max-h-[1134px] lg:flex-row lg:py-10">
                <ProductImg listImg={product?.images}/>
                <ProductInformation
                    colors={product?.colors}
                    sizes={formatSortSize(product?.sizes) || []}
                    items={product?.product_item}
                    product={product?.product}
                />
            </div>
        </section>
    );
};

export default DetailInformation;
