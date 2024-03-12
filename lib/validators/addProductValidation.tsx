import { categories } from "@/app/_components/CategoriesGrid";
import { z } from "zod";

const requiredString = z.string().min(1, "This field is required.");

const categoriesValues = categories.map((cat) => cat.value);

const categorySchema = requiredString.refine((categories) => {
  const categoriesArr = categories.split(",");
  for (const item of categoriesArr) {
    if (typeof item === "string") {
      return true;
    }

    if (categoriesValues.includes(item)) {
      return true;
    }
  }
  return false;
}, "Not valid category");

const imageSchema = z
  .custom<File | null>()
  .refine((file) => file instanceof File, "This field is required.")
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "File must be an image",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const addProductFormSchema = z.object({
  name: requiredString.max(30, "This name is too long."),
  image: imageSchema,
  brand: requiredString,
  price: requiredString.regex(/^\d*\.?\d+$/, "It is not a valid price."),
  category: categorySchema,
  stock: requiredString.regex(/^[1-9]\d*$/, "It is not a valid value."),
  description: requiredString,
});

export type TAddProductSchema = z.infer<typeof addProductFormSchema>;

export const addCategoryFormSchema = z.object({
  name: requiredString.max(30, "This name is too long."),
  image: imageSchema,
});

export type TAddCategorySchema = z.infer<typeof addCategoryFormSchema>;
