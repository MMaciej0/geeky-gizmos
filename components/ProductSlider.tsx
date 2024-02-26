"use client";

import { Product } from "@prisma/client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";

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
              <div className="relative min-h-[200px]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-2 p-4">
                <hr />
                <Badge className="ml-auto tracking-wide">
                  <span className="pr-1">$</span>
                  {product.price}
                </Badge>
                <h4 className="font-semibold">{product.name}</h4>
              </div>
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
