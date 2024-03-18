import { notFound } from "next/navigation";

import { findProductBySlug } from "@/lib/utils";
import { getBasket } from "@/lib/basket";

import ProductTemplate from "@/components/ProductTemplate";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddToCartPanel from "../_components/AddToCartPanel";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params: { slug } }: ProductPageProps) => {
  const [product, basket] = await Promise.all([
    findProductBySlug(slug),
    getBasket(),
  ]);

  if (!product) return notFound();

  const inBasketItemQty =
    basket?.items.find((i) => i.product.id === product.id)?.quantity || 0;

  return (
    <MaxWidthWrapper className="py-10">
      <ProductTemplate
        product={product}
        actionPanel={
          <AddToCartPanel product={product} inBasketItemQty={inBasketItemQty} />
        }
      />
    </MaxWidthWrapper>
  );
};

export default ProductPage;
