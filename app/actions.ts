"use server";

import { Prisma, Product } from "@prisma/client";
import prisma from "@/lib/prisma";
import { signOut } from "@/auth";

export interface SearchResult {
  productsByName?: Product[];
  productsByNameCounter?: number;
  category?: string;
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
    prisma.product.findFirst({
      where: {
        category: { contains: query, mode: "insensitive" },
      },
    }),
    prisma.product.findMany({
      where: where("brand"),
      distinct: ["brand"],
      select: { brand: true },
    }),
  ]);

  if (!productsByName.length && !brnd.length && !cat) {
    return null;
  }

  const category = cat?.category.split(",").find((ctg) => ctg.includes(query));
  const brands = brnd.map((b) => b.brand);

  return {
    productsByName,
    productsByNameCounter,
    category: category && `${category[0].toUpperCase()}${category.slice(1)}`,
    brands,
  };
};

export const logout = async () => {
  await signOut();
};
