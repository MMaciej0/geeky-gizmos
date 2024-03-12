"use server";

import { getUser } from "@/lib/utils";
import { addCategoryFormSchema } from "@/lib/validators/addProductValidation";
import { Role } from "@prisma/client";
import { uploadToCloudinary } from "../add-product/actions";
import prisma from "@/lib/prisma";

export const createCategory = async (formData: FormData) => {
  const user = await getUser();

  if (!user || user.role !== Role.ADMIN)
    return {
      error: "You do not have permission to perform this action.",
    };

  const productData = Object.fromEntries(formData.entries());

  const validatedProductData = addCategoryFormSchema.safeParse(productData);

  if (!validatedProductData.success) {
    return {
      error: "Invalid category data.",
    };
  }

  const { name, image } = validatedProductData.data;

  let productImageUrl: string | undefined = undefined;

  try {
    if (image) {
      const result = await uploadToCloudinary(image, "categories");
      productImageUrl = result.secure_url;
    }

    if (!productImageUrl)
      return {
        error:
          "The image could not be uploaded to the database. Plase try again later.",
      };

    const newCategory = await prisma.category.create({
      data: {
        name,
        imageUrl: productImageUrl,
      },
    });

    if (!newCategory)
      return {
        error: "Unable to create category. Please try again later.",
      };

    return {
      success: "Category created",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong.",
    };
  }
};
