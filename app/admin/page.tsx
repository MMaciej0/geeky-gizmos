import React from "react";

import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

const AdminPage = async () => {
  const unapprovedProducts = await prisma.product.findMany({
    include: {
      brand: true,
      categories: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      approved: false,
    },
  });

  if (unapprovedProducts.length === 0) {
    return (
      <MaxWidthWrapper>
        <h1 className="pt-16 text-center text-2xl">No products to approve.</h1>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {unapprovedProducts.map((product) => (
          <Link href={`/admin/unapproved/${product.slug}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default AdminPage;
