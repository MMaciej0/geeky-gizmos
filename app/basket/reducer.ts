import { ShoppingBasket } from "@/lib/basket";

type Action =
  | { type: "INCREASE"; payload: { basketItemId: number } }
  | { type: "DECREASE"; payload: { basketItemId: number } };

export const reducer = (basket: ShoppingBasket, action: Action) => {
  switch (action.type) {
    case "INCREASE":
      const increasedBasketItems = basket.items.map((item) => {
        if (
          item.id === action.payload.basketItemId &&
          item.quantity < item.product.stock
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return {
        ...basket,
        items: increasedBasketItems,
        size: increasedBasketItems.reduce((a, c) => a + c.quantity, 0),
        total: increasedBasketItems.reduce(
          (a, c) => a + c.quantity * c.product.price,
          0,
        ),
      };

    case "DECREASE":
      const newDecreasedBasketItems = basket.items.map((item) => {
        if (item.id === action.payload.basketItemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return {
        ...basket,
        items: newDecreasedBasketItems,
        size: newDecreasedBasketItems.reduce((a, c) => a + c.quantity, 0),
        total: newDecreasedBasketItems.reduce(
          (a, c) => a + c.quantity * c.product.price,
          0,
        ),
      };

    default:
      return basket;
  }
};
