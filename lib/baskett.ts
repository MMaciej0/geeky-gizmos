import { Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketStore {
  items: Record<string, BasketItem>;
  addItem: (product: Product, quantity: number) => void;
  deleteItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  calculateSize: () => number;
  calculateTotal: () => number;
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: {},
      addItem: (product, quantity) =>
        set((state) => {
          const existingItem = state.items[product.id];
          if (existingItem) {
            return {
              items: {
                ...state.items,
                [product.id]: {
                  ...existingItem,
                  quantity,
                },
              },
            };
          } else {
            return {
              items: {
                ...state.items,
                [product.id]: {
                  product,
                  quantity,
                },
              },
            };
          }
        }),
      increaseQuantity: (productId) =>
        set((state) => {
          const itemToIncrease = state.items[productId];
          if (itemToIncrease.quantity < itemToIncrease.product.stock) {
            return {
              ...state,
              items: {
                ...state.items,
                [productId]: {
                  ...itemToIncrease,
                  quantity: itemToIncrease.quantity + 1,
                },
              },
            };
          }
          return state;
        }),
      deleteItem: (productId) =>
        set((state) => {
          const { [productId]: deletedItem, ...remainingItems } = state.items;
          return {
            ...state,
            items: remainingItems,
          };
        }),
      decreaseQuantity: (productId) =>
        set((state) => {
          const itemToDescrease = state.items[productId];
          if (itemToDescrease.quantity > 1) {
            return {
              ...state,
              items: {
                ...state.items,
                [productId]: {
                  ...itemToDescrease,
                  quantity: itemToDescrease.quantity - 1,
                },
              },
            };
          } else {
            const { [productId]: deletedItem, ...remainingItems } = state.items;
            return {
              ...state,
              items: remainingItems,
            };
          }
        }),
      calculateSize: () => {
        return Object.values(get().items).reduce(
          (total, item) => total + item.quantity,
          0,
        );
      },
      calculateTotal: () => {
        return Object.values(get().items).reduce(
          (total, item) => total + item.quantity * item.product.price,
          0,
        );
      },
    }),

    {
      name: "basket",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
