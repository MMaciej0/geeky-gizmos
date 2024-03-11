import React, { FC } from "react";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";

import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({
  product: { imageUrl, name, price, brand },
}) => {
  return (
    <div className="overflow-hidden rounded-lg border shadow-xl transition-transform duration-300 hover:scale-[104%]">
      <div className="relative min-h-[220px]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col space-y-4 p-4">
        <div className="flex items-center justify-between space-x-4">
          <h3 className="truncate-2 h-[3em] text-lg font-semibold">{name}</h3>
          <Badge>{formatPrice(price)}</Badge>
        </div>
        <p className="text-sm">{brand}</p>
      </div>
    </div>
  );
};

export default ProductCard;
