import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";

const LoadingPage = () => {
  return (
    <MaxWidthWrapper>
      <ProductsLoadingSkeleton />
    </MaxWidthWrapper>
  );
};

export default LoadingPage;
