import { create } from "zustand";
import { createProduct, deleteProduct, getAdminProducts, getAllProducts, getProductsFilter } from "../services/product";

export const useProductStore = create((set) => ({
  // filter and list product
  filterLoading: false,
  setFilterLoading: () =>
    set((state) => ({ filterLoading: !state.filterLoading })),
  filter: {
    gender: null,
    category: null,
    brand: null,
    size: null,
    color: null,
    price: null,
  },
  filterChange: (newFilter) => {
    useProductStore.getState().setFilterLoading();
    set((state) => ({ filter: { ...state.filter, ...newFilter } }));

    if(!Object.values(useProductStore.getState().filter).every((value) => value === null)){
      useProductStore.getState().getProductsFilter();
    }else{
      useProductStore.getState().getAllProducts()
    }

    useProductStore.getState().setFilterLoading();
  },

  closeFilter: () =>
    set((state) => ({
      filter: Object.fromEntries(
        Object.keys(state.filter).map((key) => [key, null]),
      ),
    })),

  products: [],
  getAllProducts: async () => {
    useProductStore.getState().setFilterLoading();
    const response = await getAllProducts();
    set({ products: response });
    useProductStore.getState().setFilterLoading();
  },
  sortAlphaProducts: () => {
    useProductStore.getState().setFilterLoading();
    const sortedProducts = [...useProductStore.getState().products].sort(
      (a, b) => {
        const nameA = a.product_name?.charAt(0).toLowerCase();
        const nameB = b.product_name?.charAt(0).toLowerCase();
        return nameA.localeCompare(nameB);
      },
    );
    set({ products: sortedProducts });
    useProductStore.getState().setFilterLoading();
  },

  getProductsFilter: async () => {
    const response = await getProductsFilter(useProductStore.getState().filter);
    set({products: response})
  },
  
  adminProducts: [],
  loading: false,
  toggleLoading: () => set((state) => ({ loading: !state.loading })),

  fetchProductsData: async () => {
    useProductStore.getState().toggleLoading();
    const response = await getAdminProducts();
    console.log(response )
    set({ adminProducts: response });
    useProductStore.getState().toggleLoading();
  },

  sortProducts: (sortType) => {
    useProductStore.getState().toggleLoading();
    const sortedProducts = [...useProductStore.getState().adminProducts];
    sortType == "newest"
      ? sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : sortType == "oldest"
        ? sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        : sortType == "high-rating"
            ? sortedProducts.sort((a, b) => b.rating - a.rating)
            : sortType == "low-rating"
                ? sortedProducts.sort((a, b) => a.rating - b.rating)
                : sortType == "high-price"
                    ? sortedProducts.sort((a, b) => b.price - a.price)
                    : sortedProducts.sort((a, b) => a.price - b.price);
    set({ adminProducts: sortedProducts });
    useProductStore.getState().toggleLoading();
  },

  removeProduct: async(product_id) => {
    useProductStore.getState().toggleLoading();
    const response = await deleteProduct(product_id);
    if (response?.success == true) {
        await useProductStore.getState().fetchProductsData();
    }
    useProductStore.getState().toggleLoading();
  },

  createProduct: async(payload) => {
    useProductStore.getState().toggleLoading();
    const response = await createProduct(payload);
    if (response?.success == true) {
        await useProductStore.getState().fetchProductsData();
    }
    useProductStore.getState().toggleLoading();
  }

}));
