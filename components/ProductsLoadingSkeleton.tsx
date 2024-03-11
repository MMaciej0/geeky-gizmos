import React from "react";
import { Skeleton } from "./ui/skeleton";

interface ProductsLoadingSkeletonProps {
  qty?: number;
}

const ProductsLoadingSkeleton = ({ qty }: ProductsLoadingSkeletonProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(qty || 6)].map((v, i) => (
        <div className="space-y-2 border" key={i}>
          <Skeleton className="min-h-[180px] w-full" />
          <div className="space-y-2 p-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoadingSkeleton;
