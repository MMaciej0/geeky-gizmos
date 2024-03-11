"use server";

import { redirect } from "next/navigation";
import { Product } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { findProductById, getClodinaryPublicIdFromUrl } from "@/lib/utils";

type FormState = { error: string } | undefined;

export const publishProductAction = async (
  previousState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const productId = formData.get("productId");

    if (typeof productId !== "string") {
      return {
        error: "Invalid product id.",
      };
    }

    const product = await findProductById(Number(productId));

    if (!product) {
      return {
        error: "Product not found.",
      };
    }

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        approved: true,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong.",
    };
  }

  redirect("/admin");
};

export const deleteProductAction = async (
  previousState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const productId = formData.get("productId");

    if (typeof productId !== "string") {
      return {
        error: "Invalid product id.",
      };
    }

    const product = await findProductById(Number(productId));

    if (!product) {
      return {
        error: "Product not found.",
      };
    }

    const productPublicId = getClodinaryPublicIdFromUrl(product.imageUrl);
    if (productPublicId) {
      await prisma.product.delete({
        where: {
          id: product.id,
        },
      });
      await cloudinary.uploader.destroy(productPublicId);
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong.",
    };
  }

  redirect("/admin");
};
