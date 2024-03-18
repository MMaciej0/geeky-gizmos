import { cookies } from "next/headers";

import { Basket, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { decryptData, encryptString, getUser } from "./utils";

export type BasketWithProducts = Prisma.BasketGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type ShoppingBasket = BasketWithProducts & {
  size: number;
  total: number;
};

export const createBasket = async (): Promise<ShoppingBasket> => {
  const user = await getUser();

  let basket: Basket;

  if (user?.id) {
    basket = await prisma.basket.create({
      data: {
        userId: Number(user.id),
      },
    });
  } else {
    basket = await prisma.basket.create({
      data: {},
    });
  }

  const encryptedBasketId = encryptString(basket.id.toString());

  cookies().set("localBasketId", encryptedBasketId);

  return {
    ...basket,
    size: 0,
    total: 0,
    items: [],
  };
};

export const getBasket = async (): Promise<ShoppingBasket | null> => {
  const user = await getUser();
  let basket: BasketWithProducts | null = null;

  if (user) {
    basket = await prisma.basket.findFirst({
      where: {
        userId: Number(user.id),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } else {
    const encryptedBasketId = cookies().get("localBasketId")?.value;
    if (encryptedBasketId) {
      const basketId = decryptData(encryptedBasketId);
      basket = await prisma.basket.findUnique({
        where: {
          id: Number(basketId),
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }
  }

  if (!basket) return null;

  return {
    ...basket,
    size: basket.items.reduce((a, c) => a + c.quantity, 0),
    total: basket.items.reduce((a, c) => a + c.quantity * c.product.price, 0),
  };
};
