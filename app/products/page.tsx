import Link from "next/link";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { paramToFullSearchString } from "@/lib/utils";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import FilterResultsPanel from "./_components/FilterResultsPanel";
import FilterPanel from "./_components/FilterPanel";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    q?: string;
    name?: string;
    brand?: string;
  };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { category, q, name, brand } = searchParams;

  const searchQuery = q && paramToFullSearchString(q);

  const searchFilter: Prisma.ProductWhereInput = searchQuery
    ? {
        OR: [
          { name: { search: searchQuery } },
          { category: { search: searchQuery } },
          { brand: { search: searchQuery } },
          { description: { search: searchQuery } },
        ],
      }
    : {};

  const where: Prisma.ProductWhereInput = {
    AND: [
      searchFilter,
      category
        ? { category: { search: paramToFullSearchString(category) } }
        : {},
      name ? { name: { contains: name, mode: "insensitive" } } : {},
      brand ? { brand: { contains: brand, mode: "insensitive" } } : {},
      { approved: true },
    ],
  };

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "asc" },
  });

  return (
    <MaxWidthWrapper className="px-4 py-20">
      <div className="flex flex-col md:flex-row">
        <FilterResultsPanel searchParams={searchParams} />
        <FilterPanel products={products} searchParams={searchParams} />
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
