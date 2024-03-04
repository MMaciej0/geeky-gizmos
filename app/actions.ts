"use server";

import { Prisma, Product } from "@prisma/client";
import prisma from "@/lib/prisma";
import { truncateString } from "@/lib/utils";
import { signOut } from "@/auth";

export interface SearchResult {
  productsByName?: Product[];
  productsByNameCounter?: number;
  productsByDescription?: Product[];
  productsByDescriptionCounter?: number;
  category?: string;
}

export const searchProducts = async (
  query: string,
): Promise<SearchResult | null> => {
  const where = (key: keyof Product): Prisma.ProductWhereInput => ({
    [key]: { contains: query, mode: "insensitive" },
  });

  const [
    productsByName,
    productsByNameCounter,
    productsByDescription,
    productsByDescriptionCounter,
    cat,
  ] = await Promise.all([
    prisma.product.findMany({
      where: where("name"),
      take: 4,
    }),
    prisma.product.count({ where: where("name") }),
    prisma.product.findMany({
      where: where("description"),
      take: 2,
    }),
    prisma.product.count({
      where: where("description"),
    }),
    prisma.product.findFirst({
      where: {
        category: { contains: query, mode: "insensitive" },
      },
    }),
  ]);

  if (!productsByName.length && !productsByDescription.length && !cat) {
    return null;
  }

  const category = cat?.category.split(",").find((ctg) => ctg.includes(query));

  return {
    productsByName,
    productsByNameCounter,
    productsByDescription: productsByDescription
      .filter((prod) => !productsByName.some((p) => p.id === prod.id))
      .map((prod) => ({
        ...prod,
        description: truncateString(prod.description, query, 10),
      })),
    productsByDescriptionCounter,
    category: category && `${category[0].toUpperCase()}${category.slice(1)}`,
  };
};

export const logout = async () => {
  await signOut();
};
