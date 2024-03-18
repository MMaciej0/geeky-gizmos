"use server";

import { createBasket, getBasket } from "@/lib/basket";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type AddToCartReturn = { error: string } | undefined;

const defaultErrorMessage =
  "We couldn't add your product to the basket. Please try again later.";

export const addToCart = async (
  productId: number,
): Promise<AddToCartReturn> => {
  if (typeof productId !== "number") {
    return {
      error: defaultErrorMessage,
    };
  }

  try {
    const basket = (await getBasket()) ?? (await createBasket());

    const existingBasketItem = basket.items.find(
      (item) => item.productId === productId,
    );

    if (existingBasketItem) {
      if (existingBasketItem.quantity === existingBasketItem.product.stock) {
        return {
          error: "This product is out of stock.",
        };
      } else {
        await prisma.basketItem.update({
          where: {
            id: existingBasketItem.id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      }
    } else {
      await prisma.basketItem.create({
        data: {
          basketId: basket.id,
          productId,
          quantity: 1,
        },
      });
    }

    revalidatePath("/products/[slug]", "page");
  } catch (error) {
    return {
      error: defaultErrorMessage,
    };
  }
};
