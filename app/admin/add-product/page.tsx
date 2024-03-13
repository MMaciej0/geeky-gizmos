import { notFound } from "next/navigation";

import { findProductById } from "@/lib/utils";
import prisma from "@/lib/prisma";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddProductForm from "./_components/AddProductForm";

interface AddProductPageProps {
  searchParams: {
    id?: string;
  };
}

const AddProductPage = async ({
  searchParams: { id },
}: AddProductPageProps) => {
  const [product, brands, categories] = await Promise.all([
    id ? findProductById(Number(id)) : null,
    prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (id && !product) return notFound();

  return (
    <div className="py-10">
      <MaxWidthWrapper className="space-y-8">
        <AddProductForm
          productToEdit={product}
          brands={brands}
          categories={categories}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default AddProductPage;
