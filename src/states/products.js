import { create } from "zustand";
import { getAllProducts, getHotProducts, getProductsFilter } from "../services/product";

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

}));
