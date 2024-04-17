"use server";

import prisma from "@/lib/prisma";

export interface SearchParams {
  category?: string | string[];
  name?: string;
  brand?: string | string[];
  sort?: keyof SortOptions;
}

export interface SortOptions {
  newest: { key: string; method: "desc" };
  oldest: { key: string; method: "asc" };
  cheapest: { key: string; method: "asc" };
  expensive: { key: string; method: "desc" };
}

const sortCheatSheet: SortOptions = {
  newest: { key: "createdAt", method: "desc" },
  oldest: { key: "createdAt", method: "asc" },
  cheapest: { key: "price", method: "asc" },
  expensive: { key: "price", method: "desc" },
};

const productPerPage = 9;

export const fetchProducts = async (
  searchParams: SearchParams,
  page?: number,
) => {
  const { category, name, brand, sort } = searchParams;
  const orderBy = sort
    ? { [sortCheatSheet[sort].key]: sortCheatSheet[sort].method }
    : {};
  const products = await prisma.product.findMany({
    where: {
      categories: Array.isArray(category)
        ? {
            some: {
              category: {
                name: {
                  in: category,
                },
              },
            },
          }
        : category
          ? {
              some: {
                category: {
                  name: {
                    contains: category,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      brand: Array.isArray(brand)
        ? {
            is: {
              name: {
                in: brand,
              },
            },
          }
        : brand
          ? {
              is: {
                name: {
                  contains: brand,
                  mode: "insensitive",
                },
              },
            }
          : {},
      name: name
        ? {
            contains: name,
            mode: "insensitive",
          }
        : {},
    },
    include: {
      brand: true,
    },
    orderBy,
    take: productPerPage,
    skip: page ? productPerPage * (page - 1) : 0,
  });
  return products;
};

export const fetchBrands = async (searchParams: SearchParams) => {
  const { category } = searchParams;

  const brands = await prisma.brand.findMany({
    where: {
      products: Array.isArray(category)
        ? {
            some: {
              categories: {
                some: {
                  category: {
                    name: {
                      in: category,
                    },
                  },
                },
              },
            },
          }
        : category
          ? {
              some: {
                categories: {
                  some: {
                    category: {
                      name: {
                        contains: category,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            }
          : {},
    },
    include: { products: true },
  });
  return brands;
};

export const fetchCategories = async (searchParams: SearchParams) => {
  const { brand } = searchParams;

  const categories = await prisma.category.findMany({
    where: {
      products: Array.isArray(brand)
        ? {
            some: {
              product: {
                is: {
                  brand: {
                    name: {
                      in: brand,
                    },
                  },
                },
              },
            },
          }
        : brand
          ? {
              some: {
                product: {
                  is: {
                    brand: {
                      name: {
                        contains: brand,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            }
          : {},
    },
    orderBy: {
      name: "asc",
    },
  });
  return categories;
};
