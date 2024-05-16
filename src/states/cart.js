import { create } from "zustand"
import { getCartItems } from "../services/product";

export const useCartStore = create((set) => ({
    cart: [],
    getCartItems: async () => {
        const listCartItemsId = JSON.parse(localStorage.getItem("cart") || "[]")
        const list_id = listCartItemsId.map(item => item.id)
        const response = await getCartItems(list_id)
        const mapperData = response.map(item => ({
            ...item,
            quantity: listCartItemsId.find(cartItem => cartItem.id === item.product_item_id)?.quantity || 1
        }))
        const data = mapperData
        set({cart: data})
    },

    addToCart: (item) => {
        const items = JSON.parse(localStorage.getItem("cart") || "[]")
        const existingItem = items.find(existingItem => existingItem.id === item.id);
        if(!existingItem){
            const parsedItems = [...items, item]
            localStorage.setItem("cart", JSON.stringify(parsedItems))
            useCartStore.getState().getCartItems()
        }
    },

    loading: false,
    setLoading: (newLoading) => {
        set((state) => ({ loading: newLoading }));
     },

    updateCartItemQuantity: (itemId, newQuantity) => {
        useCartStore.getState().setLoading(true)
        const items = JSON.parse(localStorage.getItem("cart"));
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        useCartStore.getState().getCartItems()
        useCartStore.getState().setLoading(false)
    },
    removeFromCart: (itemId) => {
        useCartStore.getState().setLoading()
        const items = JSON.parse(localStorage.getItem("cart"));
        const updatedItems = items.filter(item => item.id !== itemId);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        useCartStore.getState().getCartItems()
        useCartStore.getState().setLoading()
    },

    clearCart: () => {
        localStorage.removeItem("cart")
        set({cart: []})
    },

    addToWishList: (item) => {
        const items = JSON.parse(localStorage.getItem("wishlist") || "[]")
        const existingItem = items.find(existingItem => existingItem._id === item._id);
        if(!existingItem){
            const parsedItems = [...items, item]
            localStorage.setItem("wishlist", JSON.stringify(parsedItems))
            
        }

    },

}));
