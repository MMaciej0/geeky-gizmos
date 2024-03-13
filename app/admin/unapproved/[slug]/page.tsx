import { notFound } from "next/navigation";

import { findProductBySlug } from "@/lib/utils";

import ProductTemplate from "@/components/ProductTemplate";
import AdminPanel from "./_components/AdminPanel";

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

  return (
    <ProductTemplate
      product={product}
      actionPanel={<AdminPanel productId={product.id} />}
    />
  );
};

export default UnapprovedProductPage;
