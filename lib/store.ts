import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]

  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void

  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void

  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ✅ ADD ITEM (smart merge)
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + (item.quantity || 1),
                    }
                  : i
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: item.quantity || 1,
                price: Number(item.price) || 0,
              },
            ],
          }
        }),

      // ✅ REMOVE ITEM
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // ✅ CLEAR CART
      clearCart: () => set({ items: [] }),

      // ✅ INCREASE QTY
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      // ✅ DECREASE QTY (remove if 0)
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      // ✅ UPDATE QTY (used in cart UI)
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? {
                    ...i,
                    quantity: Math.max(1, Number(quantity) || 1),
                  }
                : i
            ),
        })),

      // ✅ TOTAL PRICE
      getTotal: () =>
        get().items.reduce(
          (sum, item) =>
            sum + Number(item.price) * item.quantity,
          0
        ),

      // ✅ TOTAL ITEMS COUNT
      getItemCount: () =>
        get().items.reduce(
          (count, item) => count + item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
)
