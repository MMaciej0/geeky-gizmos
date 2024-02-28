import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { paramToFullSearchString } from "@/lib/utils";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    q?: string;
  };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { category, q } = searchParams;

  const searchQuery = q && paramToFullSearchString(q);
  const searchCategory = category && paramToFullSearchString(category);

  const searchFilter: Prisma.ProductWhereInput = searchQuery
    ? {
        OR: [
          { name: { search: searchQuery } },
          { category: { search: searchQuery } },
          { description: { search: searchQuery } },
        ],
      }
    : {};

  const where: Prisma.ProductWhereInput = {
    AND: [
      searchFilter,
      category ? { category: { search: searchCategory } } : {},
      { approved: true },
    ],
  };

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      {products.map((prod) => (
        <div key={prod.id}>{prod.name}</div>
      ))}
    </div>
  );
};

export default ProductsPage;