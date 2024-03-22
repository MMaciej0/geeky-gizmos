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
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "basket",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
