"use server";

import { Prisma, Product } from "@prisma/client";
import prisma from "@/lib/prisma";
import { signOut } from "@/auth";

export interface SearchResult {
  productsByName?: Product[];
  productsByNameCounter?: number;
  category?: string[];
  brands?: string[];
}

export const searchProducts = async (
  query: string,
): Promise<SearchResult | null> => {
  const where = (key: keyof Product): Prisma.ProductWhereInput => ({
    [key]: { contains: query, mode: "insensitive" },
    approved: true,
  });

  const [productsByName, productsByNameCounter, cat, brnd] = await Promise.all([
    prisma.product.findMany({
      where: where("name"),
      take: 4,
    }),
    prisma.product.count({ where: where("name") }),
    prisma.category.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
    }),
    prisma.brand.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
    }),
  ]);

  if (!productsByName.length && !brnd.length && !cat) {
    return null;
  }

  return {
    productsByName,
    productsByNameCounter,
    category: cat.map((c) => c.name),
    brands: brnd.map((b) => b.name),
  };
};

export const logout = async () => {
  await signOut();
};
