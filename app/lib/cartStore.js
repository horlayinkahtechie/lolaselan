import { create } from "zustand";

const useCartStore = create((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  incrementCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCart: () =>
    set((state) => ({ cartCount: Math.max(state.cartCount - 1, 0) })),
}));

export default useCartStore;
