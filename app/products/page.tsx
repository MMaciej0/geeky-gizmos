import Link from "next/link";

import prisma from "@/lib/prisma";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import FilterPanel from "./_components/FilterPanel";
import { Suspense } from "react";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";
import Await from "@/components/Await";
import ProductsList from "./_components/ProductsList";
import { ProductWithBrandPayload } from "@/types/product";
import { nanoid } from "nanoid";

interface SortOptions {
  newest: { key: string; method: "desc" };
  oldest: { key: string; method: "asc" };
  cheapest: { key: string; method: "asc" };
  expensive: { key: string; method: "desc" };
}

export interface SearchParams {
  category?: string | string[];
  name?: string;
  brand?: string | string[];
  sort?: keyof SortOptions;
}

interface ProductsPageProps {
  searchParams: SearchParams;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const [brands, categories] = await Promise.all([
    fetchBrands(searchParams),
    fetchCategories(searchParams),
  ]);

  return (
    <div key={nanoid(10)}>
      <MaxWidthWrapper className="py-20 lg:flex lg:px-8">
        <div className="lg:mr-8 xl:mr-16">
          <FilterPanel
            searchParams={searchParams}
            brands={brands}
            categories={categories}
          />
        </div>
        <Suspense fallback={<ProductsLoadingSkeleton qty={9} />}>
          <Await promise={fetchProducts(searchParams)}>
            {(products: ProductWithBrandPayload[]) => (
              <ProductsList products={products} />
            )}
          </Await>
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductsPage;

const sortCheatSheet: SortOptions = {
  newest: { key: "createdAt", method: "desc" },
  oldest: { key: "createdAt", method: "asc" },
  cheapest: { key: "price", method: "asc" },
  expensive: { key: "price", method: "desc" },
};

const fetchProducts = async (searchParams: SearchParams) => {
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
  });
  return products;
};

const fetchBrands = async (searchParams: SearchParams) => {
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

const fetchCategories = async (searchParams: SearchParams) => {
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
