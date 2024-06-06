import { create } from "zustand";
import { getAllOrders } from "../services/order";

export const useOrderStorage = create((set) => ({
  orders: [],
  pendingOrders: [],
  loading: false,
  toggleLoading: () => set((state) => ({ loading: !state.loading })),

  fetchOrdersData: async () => {
    useOrderStorage.getState().toggleLoading();
    const response = await getAllOrders();
    set({ orders: response });
    set({pendingOrders: response.filter(order => order.order_status === 'pending')})
    useOrderStorage.getState().toggleLoading();
  },

  sortOrder: (sortType) => {
    useOrderStorage.getState().toggleLoading();
    const sortedOrders = [...useOrderStorage.getState().orders];
    switch (sortType) {
        case "newest":
          sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "oldest":
          sortedOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "alphabet":
          sortedOrders.sort((a, b) => {
            const nameA = a.shipping_address?.name.toLowerCase() || '';
            const nameB = b.shipping_address?.name.toLowerCase() || '';
            return nameA.localeCompare(nameB);
          });
          break;
        case "non-alphabet":
          sortedOrders.sort((a, b) => {
            const nameA = a.shipping_address?.name.toLowerCase() || '';
            const nameB = b.shipping_address?.name.toLowerCase() || '';
            return nameB.localeCompare(nameA);
          });
          break;
        case "pending":
          sortedOrders.sort((a, b) => b.order_status.localeCompare(a.order_status));
          break;
        default:
          sortedOrders.sort((a, b) => a.order_status.localeCompare(b.order_status));
          break;
      }
    set({ orders: sortedOrders });
    useOrderStorage.getState().toggleLoading();
  },

  searchOrder: async(query) => {
    useOrderStorage.getState().toggleLoading();
    const orders = useOrderStorage.getState().orders
    const searchOrders = orders.filter(order => {
        return order.id.includes(query)
    })
    set({ orders: searchOrders });
    useOrderStorage.getState().toggleLoading();
  },

}));
