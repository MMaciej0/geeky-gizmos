"use server";
import { cookies } from "next/headers";

import { Basket, BasketItem, Prisma } from "@prisma/client";
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

export const mergeAnnonymousBasketWithUserBasket = async (userId: number) => {
  const localBasketId = cookies().get("localBasketId")?.value;
  if (!localBasketId) return null;
  const decryptedLocalBasketId = Number(decryptData(localBasketId));

  const annonymousBasket = await prisma.basket.findUnique({
    where: {
      id: decryptedLocalBasketId,
    },
    include: {
      items: true,
    },
  });

  if (!annonymousBasket) return null;

  const userBasket = await prisma.basket.findFirst({
    where: {
      userId: userId,
    },
    include: {
      items: true,
    },
  });

  await prisma.$transaction(async (tx) => {
    if (userBasket) {
      const mergedItems = mergeBasketItems(
        annonymousBasket.items,
        userBasket.items,
      );

      await tx.basketItem.deleteMany({
        where: {
          basketId: userBasket.id,
        },
      });

      await prisma.basketItem.createMany({
        data: mergedItems.map((item) => ({
          basketId: userBasket.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await tx.basket.create({
        data: {
          userId,
          items: {
            createMany: {
              data: annonymousBasket.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }
    await prisma.basket.delete({
      where: {
        id: annonymousBasket.id,
      },
    });
    cookies().delete("localBasketId");
  });
};

const mergeBasketItems = (items1: BasketItem[], items2: BasketItem[]) => {
  const mergedItems: { [productId: string]: BasketItem } = {};

  const allItems: BasketItem[] = [...items1, ...items2];

  allItems.forEach((item) => {
    const { productId } = item;

    if (!mergedItems[productId]) {
      mergedItems[productId] = item;
    } else {
      mergedItems[productId].quantity += item.quantity;
    }
  });

  return Object.values(mergedItems);
};
