import axios from "axios";

const productUrl = import.meta.env.VITE_BASE_URL_SERVER;

const productAPI = axios.create({
  baseURL: productUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProducts = async () => {
  try {
    const response = await productAPI.get("/products");
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getProductsFilter = async (filter) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(filter).filter(([key, value]) => value !== null),
    );

    const category = await productAPI.get("/categories");
    const categories = category?.data
    const response = await productAPI.get("/products");
    const products = response?.data

    const includeCategory = (category_name, categories) => {
        const category =  categories.find(c => c.category_name === category_name)
        return category.id ? category.id : null
    }

    const filterFunction = (products, filterConditions, categories) => {
      return products.filter(
        (product) => {

        if (filterConditions.category && !product.category_id.includes(includeCategory(filterConditions.category, categories)) )
        {
           return false
        }
        if(filterConditions.gender && !product.category_id.includes(includeCategory(filterConditions.gender, categories))){
            return false
        }

        if (filterConditions.brand && 
            !product.category_id.includes(includeCategory(filterConditions.brand, categories))) {
            return false
        }

        if (filterConditions.price) {
            const [minPrice, maxPrice] = filterConditions.price;
            if (product.price < minPrice || product.price > maxPrice) {
              return false;
            }
        }
        
        return true;
      })
    }

    const filterProducts = filterFunction(products, filteredParams, categories)
    return filterProducts
    
  } catch (error) {
    return error?.response;
  }
};

export const getHotProducts = async () => {
  try {
    const response = await productAPI.get(`/products`);
    const products = response?.data;
    products.sort((a, b) => b.rating - a.rating);
    const hotProducts = products.slice(0, 8);
    return hotProducts;
  } catch (error) {
    return error?.response;
  }
};

export const getProduct = async (product_id) => {
  try {
    const response = await productAPI.get(`/products/${product_id}`);
    const product_items = await productAPI.get(
      "/products-items?product_id->=" + product_id,
    );
    const items = product_items?.data;
    const images = [];
    images.push(response?.data.product_image);
    const sizes = [];
    const colors = [];
    items.forEach((item) => {
      images.push(item.product_image);
      sizes.push(item.size);
      colors.push(item.color);
    });

    return {
      product: response?.data,
      colors: colors,
      sizes: sizes,
      images: images,
      product_item: items,
    };
  } catch (error) {
    return error?.response;
  }
};

// review
export const getReview = async (product_id) => {
  try {
    const response = await productAPI.get(`/reviews?product_id->=` + product_id);
    const user_data = await productAPI.get("/users");
    const users = user_data?.data;
    const reviews_items = response?.data;
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const reviewUser = reviews_items.map((item) => {
      const user = users.find((user) => user.id === item.user_id);
      const user_image = user?.profileImg;
      const user_name = user?.name;
      ratingCounts[item?.rating]++;
      return {
        user_image,
        user_name,
        user_id: item.user_id,
        id: item.id,
        comment: item?.comment,
        createdAt: item?.createdAt,
        rating: item?.rating,
        review_image: item?.review_image,
      };
    });

    reviewUser.sort((a, b) => {
      const createdAtA = new Date(a.createdAt);
      const createdAtB = new Date(b.createdAt);
      return createdAtB - createdAtA;
    });

    const totalCount = reviews_items.length || 1;
    const ratingPercentages = [];
    for (let rating = 1; rating <= 5; rating++) {
      const count = ratingCounts[rating];
      const percentage = (count / totalCount) * 100;
      ratingPercentages[rating - 1] = {
        star: rating,
        percent: percentage.toFixed(2) + "%",
      };
    }
    return {
      review_percent: ratingPercentages,
      review_item: reviewUser,
    };
  } catch (error) {
    return error?.response;
  }
};

export const getRelatedProduct = async (product_id) => {
  try {
    const response = await productAPI.get(`/products`);
    const products = response?.data
    const product = products.find(p => p.id === product_id)
    const categories = product.category_id
    const filteredProducts = products.filter(p => 
      p.id !== product_id && p.category_id.some(categoryId => categories.includes(categoryId))
    );
    const limitedProducts = filteredProducts.slice(0, 4);
    return limitedProducts
  } catch (error) {
    return error?.response;
  }
};


// cart
export const getCartItems = async (listId) => {
  try {
    const response = await productAPI.get("/products-items")
    const product = await productAPI.get("/products")
    const products = product?.data
    const items = response?.data
    const cartItems = listId.map(id => {
      const item = items.find(item => item.id === id)
      const product = products.find(product => product.id === item.product_id)
      return {
        product_name: product?.product_name,
        price: item?.sale ? item?.price * (100-item?.sale) /100 : item?.price,
        qty_in_stock: item?.quantity,
        product_image: item?.product_image,
        product_item_id: item?.id,
        color: item?.color,
        size: item?.size,
      }
    })
    return cartItems
  } catch (error) {
    return error?.response;
  }
};

export const getSearchProducts = async (query) => {
  try {
    const response = await productAPI.get(`/products`);
    const products = response?.data
    const productSearch = products.filter(product => 
      product.product_name.toLowerCase().includes(query.toLowerCase())
    )
    const product = productSearch.slice(0,4)
    return product
  } catch (error) {
    return error?.response;
  }
};
