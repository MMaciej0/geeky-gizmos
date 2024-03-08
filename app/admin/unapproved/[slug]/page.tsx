import React from "react";
import { notFound } from "next/navigation";

import { findProductBySlug } from "@/lib/utils";

import ProductTemplate from "@/components/ProductTemplate";

interface UnapprovedProductPageProps {
  params: {
    slug: string;
  };
}

const UnapprovedProductPage = async ({
  params: { slug },
}: UnapprovedProductPageProps) => {
  const product = await findProductBySlug(slug);

  if (!product) return notFound();

  return <ProductTemplate product={product} />;
};

export default UnapprovedProductPage;
