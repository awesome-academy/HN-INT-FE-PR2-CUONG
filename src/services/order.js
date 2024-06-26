import axios from "axios"

const orderUrl = import.meta.env.VITE_BASE_URL_SERVER

const orderAPI = axios.create({
    baseURL: orderUrl,
    headers: {
        'Content-Type' : 'application/json',
    }
})

export const createOrder = async (order) =>{
    try{
        const response = await orderAPI.post('/orders', order)
        return response?.data
    }catch(error){
        return error?.response
    }
}

export const getUserOrder = async (user_id) => {
    try {
        const response = await orderAPI.get('/orders');
        const orders = response?.data;
        
        const productResponse = await orderAPI.get('/products');
        const products = productResponse?.data;

        const itemResponse = await orderAPI.get('/products-items');
        const productItems = itemResponse?.data;

        const userOrders = orders.filter(order => order?.user_id == user_id);
        console.log(userOrders);

        const userOrdersWithItems = userOrders.map(order => {
            const items = order.order_items.map(item => {
                const productItem = productItems.find(product_item => product_item.id === item.product_item_id);
                const product = products.find(product => product.id === productItem.product_id)
                console.log(product)
                return {
                    ...productItem,
                    quantity: item?.quantity,
                    product_name: product?.product_name,
                };
            });
            return {
                ...order,
                order_items: items
            };
        });

        return userOrdersWithItems;
    } catch (error) {
        console.error('Lỗi:', error);
        return error?.response || { status: 'error', message: 'Lỗi không xác định' };
    }
}

export const updateOrder = async(order_id) => {
    try{
        const response = await orderAPI.get('/orders')
        const orders = response?.data
        const order = orders.find(o => o.id === order_id)
        const payload = {...order, order_status: 'delivered'}
        const updateResponse = await orderAPI.put(`/orders/${order_id}`, payload)
    
        return response?.data
    }catch(error){
        return error?.response
    }
}

export const getAllOrders = async() => {
    try{
        const response = await orderAPI.get('/orders')
        const orders = response?.data
        const productItems = await orderAPI.get('/products-items')
        const items = productItems?.data
        const productData = await orderAPI.get('/products')
        const products = productData?.data

        const data = orders.map(order => {
            const orderItems = order.order_items.map(item =>{
                const productItem = items.find(i => i.id === item.product_item_id)
                const product = products.find(p => p.id === productItem.product_id)
                return {
                    ...item,
                    product_name: product?.product_name,
                    product_image: product?.product_image,
                    size: productItem?.size,
                    color: productItem?.color
                }
            })
            return{
                ...order,
                order_items: orderItems
            }
        })
        return data
    }catch(error){
        return error?.response
    }
}
