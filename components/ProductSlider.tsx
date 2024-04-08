import React, { FC } from "react";
import Link from "next/link";

import { ProductWithBrandPayload } from "@/types/product";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
  productsFetcher: () => Promise<ProductWithBrandPayload[]>;
}

const ProductSlider: FC<ProductSliderProps> = async ({ productsFetcher }) => {
  const products = await productsFetcher();
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="w-full px-8 md:overflow-visible md:px-0"
    >
      <CarouselContent className="px-6 pb-4">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-10 md:basis-1/2 lg:basis-1/3"
          >
            <Link
              href={`products/${product.slug}`}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <ProductCard product={product} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductSlider;

export const ProductSliderLoadingSkeleton = () => (
  <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div className="mx-10 space-y-2 rounded-md border md:mx-0">
      <Skeleton className="min-h-[180px] w-full" />
      <div className="space-y-2 p-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
    <div className="hidden space-y-2 rounded-md border md:block">
      <Skeleton className="min-h-[180px] w-full" />
      <div className="space-y-2 p-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
    <div className="hidden space-y-2 rounded-md border lg:block">
      <Skeleton className="min-h-[180px] w-full" />
      <div className="space-y-2 p-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  </div>
);
