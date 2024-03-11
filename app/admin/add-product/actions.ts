"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

import { Role } from "@prisma/client";
import prisma from "@/lib/prisma";
import {
  findProductById,
  getClodinaryPublicIdFromUrl,
  getUser,
  toSlug,
} from "@/lib/utils";
import { addProductFormSchema } from "@/lib/validators/addProductValidation";
import cloudinary from "@/lib/cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
}

export const createProduct = async (
  formData: FormData,
  productToEditId?: number,
) => {
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
  try {
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

    const productData = {
      name: name.trim(),
      slug,
      brand,
      imageUrl: productImageUrl,
      category,
      price: Number(price),
      stock: parseInt(stock),
      description: description.trim(),
    };

    if (productToEditId) {
      const existingProduct = await findProductById(productToEditId);

      if (!existingProduct) {
        return {
          error: "Invalid product to edit id",
        };
      }

      const publicId = getClodinaryPublicIdFromUrl(existingProduct.imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const updatedProduct = await prisma.product.update({
        where: {
          id: existingProduct.id,
        },
        data: productData,
      });

      if (!updatedProduct) {
        return {
          error: "The product could not be updated. Plase try again later",
        };
      }
    } else {
      const newProduct = await prisma.product.create({
        data: productData,
      });

      if (!newProduct)
        return {
          error: "The product could not be created. Plase try again later",
        };
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong.",
    };
  }

  redirect("/admin");
};
