"use server";

import { getUser } from "@/lib/utils";
import { addCategoryFormSchema } from "@/lib/validators/addProductValidation";
import { Role } from "@prisma/client";
import { uploadToCloudinary } from "../add-product/actions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  let categoryImageUrl: string | undefined = undefined;
  let categoryImagePublicId: string | undefined = undefined;

  try {
    if (image) {
      const { publicId, secureUrl } = await uploadToCloudinary(
        image,
        "categories",
      );
      categoryImageUrl = secureUrl;
      categoryImagePublicId = publicId;
    }

    if (!categoryImageUrl && !categoryImagePublicId)
      return {
        error:
          "The image could not be uploaded to the database. Plase try again later.",
      };

    const newCategory = await prisma.category.create({
      data: {
        name,
        imageUrl: categoryImageUrl!,
        imagePublicId: categoryImagePublicId!,
      },
    });

    if (!newCategory)
      return {
        error: "Unable to create category. Please try again later.",
      };
    revalidatePath("/", "page");
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
