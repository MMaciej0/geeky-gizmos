"use server";

import { Role } from "@prisma/client";
import { getUser } from "@/lib/utils";
import { TAddBrandSchema } from "@/lib/validators/addProductValidation";
import prisma from "@/lib/prisma";

export const createBrand = async (brand: TAddBrandSchema) => {
  const user = await getUser();

  if (!user || user.role !== Role.ADMIN)
    return {
      error: "You do not have permission to perform this action.",
    };

  if (typeof brand.name !== "string") {
    return {
      error: "Invalid brand data.",
    };
  }

  try {
    const newBrand = await prisma.brand.create({
      data: {
        name: brand.name,
      },
    });

    if (!newBrand)
      return {
        error: "Unable to create brand. Please try again later.",
      };

    return {
      success: "Brand created",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong.",
    };
  }
};
