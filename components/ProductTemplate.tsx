import React, { ReactNode } from "react";
import Image from "next/image";

import { Product } from "@prisma/client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Markdown from "./Markdown";

interface ProductTemplateProps {
  product: Product;
  actionPanel?: ReactNode;
}

const ProductTemplate = ({ product, actionPanel }: ProductTemplateProps) => {
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 overflow-hidden pb-20 lg:h-[80vh] lg:grid-cols-2 lg:pb-0">
        <div>
          <div className="relative flex justify-center">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={640}
              height={640}
              className="object-cover"
            />
          </div>
          <div
            className="fixed bottom-0 left-0 right-0 z-50
         w-full bg-accent lg:static lg:bg-background"
          >
            {actionPanel}
          </div>
        </div>
        <div className="flex flex-col space-y-4 overflow-auto p-8">
          <div className="flex items-center justify-between space-x-4">
            <h3 className="text-2xl font-bold">{product.name}</h3>
          </div>
          <p>{product.brand}</p>
          <Markdown>{product.description}</Markdown>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductTemplate;
