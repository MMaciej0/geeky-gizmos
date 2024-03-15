import { notFound } from "next/navigation";

import { findProductBySlug, formatPrice } from "@/lib/utils";

import { ShoppingBasket } from "lucide-react";
import ProductTemplate from "@/components/ProductTemplate";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params: { slug } }: ProductPageProps) => {
  const product = await findProductBySlug(slug);

  if (!product) return notFound();

  const addToCartPanel = (
    <div className="py-10 text-center">
      <div className="flex items-center justify-center lg:shadow-md">
        <div className="flex w-full max-w-[450px] items-center rounded-md bg-accent lg:max-w-full">
          <p className="w-full text-center text-lg font-bold">
            {formatPrice(product.price)}
          </p>
          <Button className="px-12">
            Add to cart <ShoppingBasket className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <MaxWidthWrapper className="py-10">
      <ProductTemplate product={product} actionPanel={addToCartPanel} />
    </MaxWidthWrapper>
  );
};

export default ProductPage;
