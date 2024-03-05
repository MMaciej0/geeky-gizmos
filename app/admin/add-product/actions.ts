"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { getUser, toSlug } from "@/lib/utils";
import { addProductFormSchema } from "@/lib/validators/addProductValidation";
import { Role } from "@prisma/client";

interface CloudinaryUploadResult {
  secure_url: string;
}

cloudinary.config({
  cloud_name: "dcmmff2dl",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createProduct = async (formData: FormData) => {
  const user = await getUser();

  if (!user || user.role !== Role.ADMIN)
    return {
      error: "You do not have permission to perform this action.",
    };

  const productData = Object.fromEntries(formData.entries());

  const validatedProductData = addProductFormSchema.safeParse(productData);

  if (!validatedProductData.success) {
    return {
      error: "Invalid product data.",
    };
  }

  const { name, image, price, category, stock, description, brand } =
    validatedProductData.data;

  let productImageUrl: string | undefined = undefined;

  const slug = `${toSlug(name)}-${nanoid(10)}`;

  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result as CloudinaryUploadResult);
          })
          .end(buffer);
      },
    );
    productImageUrl = result.secure_url;
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
      brand,
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

  redirect(`/created-product/${slug}`);
};
