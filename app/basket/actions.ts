"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const defaultErrorMessage =
  "We couldn't change quantity of this product. Please try again later.";

export const changeBasketItemQuantity = async (
  basketItemId: number,
  type: "increase" | "decrease",
) => {
  try {
    if (typeof basketItemId !== "number")
      return {
        error: defaultErrorMessage,
      };

    const basketItem = await prisma.basketItem.findUnique({
      where: {
        id: basketItemId,
      },
      include: {
        product: true,
      },
    });

    if (!basketItem)
      return {
        error: defaultErrorMessage,
      };

    if (type === "increase") {
      if (basketItem.quantity < basketItem.product.stock) {
        await prisma.basketItem.update({
          where: {
            id: basketItem.id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      }
    } else if (type === "decrease") {
      if (basketItem.quantity > 1) {
        await prisma.basketItem.update({
          where: {
            id: basketItem.id,
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        });
      } else {
        await prisma.basketItem.delete({
          where: {
            id: basketItem.id,
          },
        });
      }
    }

    revalidatePath("/basket", "page");
  } catch (error) {
    return {
      error: defaultErrorMessage,
    };
  }
};
