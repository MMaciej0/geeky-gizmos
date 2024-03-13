import Link from "next/link";

import prisma from "@/lib/prisma";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import FilterResultsPanel from "./_components/FilterResultsPanel";
import FilterPanel from "./_components/FilterPanel";

export interface SearchParams {
  categoryId?: string | string[];
  name?: string;
  brandId?: string | string[];
}

interface ProductsPageProps {
  searchParams: SearchParams;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const products = await fetchProducts(searchParams);

  return (
    <MaxWidthWrapper className="px-4 py-20">
      <div className="flex flex-col md:flex-row">
        <FilterResultsPanel searchParams={searchParams} />
        {/* <FilterPanel products={products} searchParams={searchParams} /> */}
      </div>
      {products.length === 0 ? (
        <h1 className="py-6 text-center text-2xl font-bold">
          No Products found. Please change your searching criteria.
        </h1>
      ) : (
        <>
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((prod) => (
              <Link key={prod.id} href={`/products/${prod.slug}`}>
                <ProductCard product={prod} />
              </Link>
            ))}
          </section>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default ProductsPage;

const fetchProducts = async (searchParams: SearchParams) => {
  const { categoryId, name, brandId } = searchParams;
  const products = await prisma.product.findMany({
    where: {
      categories: Array.isArray(categoryId)
        ? {
            some: {
              category: {
                id: {
                  in: categoryId.map((c) => Number(c)),
                },
              },
            },
          }
        : categoryId
          ? {
              some: {
                category: {
                  id: Number(categoryId),
                },
              },
            }
          : {},
      brandId: Array.isArray(brandId)
        ? {
            in: brandId.map((c) => Number(c)),
          }
        : brandId
          ? Number(brandId)
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};
