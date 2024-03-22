import { notFound } from "next/navigation";

import { findProductBySlug } from "@/lib/utils";

import ProductTemplate from "@/components/ProductTemplate";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddToCartPanel from "../_components/AddToCartPanel";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params: { slug } }: ProductPageProps) => {
  const product = await findProductBySlug(slug);

  if (!product) return notFound();

  return (
    <MaxWidthWrapper className="py-10">
      <ProductTemplate
        product={product}
        actionPanel={<AddToCartPanel product={product} />}
      />
    </MaxWidthWrapper>
  );
};

export default ProductPage;
