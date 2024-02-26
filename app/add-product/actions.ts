"use server";

import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import path from "path";
import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { addProductFormSchema } from "@/lib/validators/addProductForm";
import { redirect } from "next/navigation";

export const createProduct = async (formData: FormData) => {
  const productData = Object.fromEntries(formData.entries());

  const validatedProductData = addProductFormSchema.safeParse(productData);

  if (!validatedProductData.success) {
    return {
      error: "Invalid product data.",
    };
  }

  const { name, image, price, category, stock, description } =
    validatedProductData.data;

  let productImageUrl: string | undefined = undefined;

  const slug = `${toSlug(name)}-${nanoid(10)}`;

  if (image) {
    const blob = await put(
      `products_images/${slug}${path.extname(image.name)}`,
      image,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    productImageUrl = blob.url;
  }

  if (!productImageUrl)
    return {
      error:
        "The image could not be uploaded to the database. Plase try again later.",
    };

  const newProduct = await prisma.product.create({
    data: {
      name: name.trim(),
      slug,
      imageUrl: productImageUrl,
      category,
      price: Number(price),
      stock: parseInt(stock),
      description: description.trim(),
    },
  });

  if (!newProduct)
    return {
      error: "The product could not be created. Plase try again later",
    };

  redirect("/created-product");
};
