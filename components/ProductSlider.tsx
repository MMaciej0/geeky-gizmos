"use client";

import { Product } from "@prisma/client";
import React, { FC } from "react";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: FC<ProductSliderProps> = ({ products }) => {
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
              href={`product/${product.slug}`}
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
