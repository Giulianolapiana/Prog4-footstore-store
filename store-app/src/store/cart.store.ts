import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../features/cart/types';
import type { Product } from '../features/products/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addToCart: (product: Product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return { items: state.items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },
      removeFromCart: (productId: number) => {
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }));
      },
      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) { get().removeFromCart(productId); return; }
        set((state) => ({ items: state.items.map((i) => i.product.id === productId ? { ...i, quantity } : i) }));
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getSubtotal: () => get().items.reduce((sum, item) => sum + item.product.precio_base * item.quantity, 0),
      getTotal: () => { const sub = get().getSubtotal(); return sub + (sub > 0 ? 2.5 : 0); },
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'store-cart' }
  )
);
