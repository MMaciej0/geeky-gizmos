"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

import { Role } from "@prisma/client";
import prisma from "@/lib/prisma";
import { findProductById, getUser, toSlug } from "@/lib/utils";
import { addProductFormSchema } from "@/lib/validators/addProductValidation";
import cloudinary from "@/lib/cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export const createOrUpdateProduct = async (
  formData: FormData,
  productToEditId?: number,
) => {
  try {
    const user = await getUser();
    if (!user || user.role !== Role.ADMIN) {
      return { error: "You do not have permission to perform this action." };
    }

    const data = Object.fromEntries(formData.entries());
    const validatedProductData = addProductFormSchema.safeParse(data);

    if (!validatedProductData.success) {
      return { error: "Invalid product data." };
    }

    const { name, image, price, category, stock, description, brand } =
      validatedProductData.data;
    const slug = `${toSlug(name)}-${nanoid(10)}`;

    let productImageUrl: string | undefined = undefined;
    let productImagePublicId: string | undefined = undefined;

    if (image) {
      const { secureUrl, publicId } = await uploadToCloudinary(
        image,
        "Products",
      );
      productImageUrl = secureUrl;
      productImagePublicId = publicId;
    }

    if (!productImageUrl && !productImagePublicId) {
      return {
        error:
          "Failed to upload the image to the database. Please try again later.",
      };
    }

    const productData = {
      name: name.trim(),
      slug,
      brandId: Number(brand),
      imageUrl: productImageUrl!,
      imagePublicId: productImagePublicId!,
      price: Number(price),
      stock: parseInt(stock),
      description: description.trim(),
    };

    const categories = category.split(",").map((c) => Number(c));

    if (productToEditId) {
      const existingProduct = await findProductById(productToEditId);
      if (!existingProduct) {
        return { error: "Invalid product to edit ID." };
      }

      await cloudinary.uploader.destroy(existingProduct.imagePublicId);

      await prisma.product.update({
        where: { id: existingProduct.id },
        data: productData,
      });
      await updateProductCategories(existingProduct.id, categories);
    } else {
      const newProduct = await prisma.product.create({ data: productData });
      if (!newProduct) {
        return {
          error: "Failed to create the product. Please try again later.",
        };
      }

      const associationsToAdd = categories.map((catId) => ({
        categoryId: catId,
        productId: newProduct.id,
      }));
      await prisma.categoryToProduct.createMany({ data: associationsToAdd });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { error: "Something went wrong." };
  }

  redirect("/admin");
};

const updateProductCategories = async (
  productId: number,
  newCategoriesIds: number[],
) => {
  try {
    const existingProductCategories = await prisma.categoryToProduct.findMany({
      where: { productId },
    });

    const existingProductCategoriesIds = existingProductCategories.map(
      (cat) => cat.categoryId,
    );

    const associationsToAdd = newCategoriesIds.filter(
      (cId) => !existingProductCategoriesIds.includes(cId),
    );
    const associationsToRemove = existingProductCategoriesIds.filter(
      (cId) => !newCategoriesIds.includes(cId),
    );

    const addPromises = associationsToAdd.map((catId) => {
      return prisma.categoryToProduct.create({
        data: { categoryId: catId, productId },
      });
    });

    const removePromises = associationsToRemove.map((catId) => {
      return prisma.categoryToProduct.deleteMany({
        where: { categoryId: catId, productId },
      });
    });

    await Promise.all([...addPromises, ...removePromises]);
  } catch (error) {
    console.error("Error updating product categories:", error);
    throw new Error("Failed to update product categories");
  }
};

export const uploadToCloudinary = async (image: File, folderName: string) => {
  try {
    const arrayBuffer = await image.arrayBuffer();
    const mime = image.type;
    const encoding = "base64";
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const imageUri = "data:" + mime + ";" + encoding + "," + base64Data;
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader.upload(
          imageUri,
          { folder: folderName },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          },
        );
      },
    );
    return { secureUrl: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
