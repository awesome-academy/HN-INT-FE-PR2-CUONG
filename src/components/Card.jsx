import {
  AiFillStar,
  AiOutlineFullscreen,
  AiOutlineHeart,
  AiOutlineShopping,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatPrice, originalPrice } from "../utils/format";

const ProductCard = ({ product }) => {

  const id = product?._id

  const handleFullScreen = (event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    element.requestFullscreen();
  };

  return (
    <div className="w-full h-fit">
      <Link to={`/product/${id}`}>
        <div
          className="w-full h-fit min-h-[25rem] 
            overflow-hidden bg-[rgb(245,245,245)] relative
            group/item cursor-pointer
            "
        >
          <img
            id={id}
            className="h-auto min-h-[25rem] w-full absolute"
            src={product?.product_image}
            alt=""
            loading="lazy"
          />
          {product?.sale != 0 && <div
            className="w-[4rem] h-[4rem] flex items-center 
            justify-center p-2 absolute bg-white top-3 left-4
            rounded-[50%] text-[rgb(58,178,119)] font-bold
            "
          >
            {product?.sale}%
          </div>}
          <div className="flex-col absolute right-2 top-2 lg:hidden md:group-hover/item:flex flex">
            <button
              className="w-[3rem] h-[3rem] mb-2
                bg-white flex items-center justify-center rounded-[50%]"
            >
              <AiOutlineHeart className="w-[1.5rem] h-[1.5rem]" />
            </button>
            <button
              className="w-[3rem] h-[3rem]  mb-2 
                bg-white flex items-center justify-center rounded-[50%]"
              onClick={handleFullScreen}
            >
              <AiOutlineFullscreen className="w-[1.5rem] h-[1.5rem]" />
            </button>
            <button
              className="w-[3rem] h-[3rem] 
                bg-white flex items-center justify-center rounded-[50%]"
            >
              <AiOutlineShopping className="w-[1.5rem] h-[1.5rem]" />
            </button>
          </div>
        </div>
      </Link>

      <div className="mt-4">
        <div className="flex justify-between">
          <p className="sm:text-xl text-lg font-bold mb-2 truncate">
            {product?.product_name}
          </p>
          <div className="flex flex-row justify-center items-start">
            <AiFillStar className="w-[1.5rem] h-[1.7rem] text-[rgb(244,189,98)]" />
            <span className="ml-2 font-medium sm:text-xl text-lg">{product?.rating}</span>
          </div>
        </div>

        <p className="sm:text-xl text-lg font-semibold text-[rgb(210,0,0)]">
          {product?.sale == 0 ?
            formatPrice(product?.price) : originalPrice(product?.price, product?.sale)
          }
          {product?.sale ?
            <span className="text-black opacity-40 line-through ml-4">
              {formatPrice(product?.price) }
            </span> : null
          }
        </p>
      </div>
    </div >
  );
};

export default ProductCard;
