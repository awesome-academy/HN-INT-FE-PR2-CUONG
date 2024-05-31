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

    console.log(filteredParams)
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
    const response = await productAPI.get(`/product/detail/${product_id}`);
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getSearchProducts = async (query) => {
  try {
    const response = await productAPI.get(`/products`);
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getRelatedProduct = async(product_id) => {
    try{
        const response = await productAPI.get(`/product/related/${product_id}`)
        return response?.data
    }catch(error){
        return error?.response
    }
}

// review
export const getReview = async (product_id) => {
    try{
        const response = await productAPI.get(`/product/review/${product_id}`)
        return response?.data?.data
    }catch(error){
        return error?.response
    }
}


// cart
export const getCartItems = async(listId) => {
    try{
        const response = await productAPI.get('/cart/'+listId)
        return response?.data
    }catch(error){
        return error?.response
    }
}
