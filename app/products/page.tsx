import { Suspense } from "react";
import { nanoid } from "nanoid";

import {
  SearchParams,
  fetchBrands,
  fetchCategories,
  fetchProducts,
} from "./actions";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FilterPanel from "./_components/FilterPanel";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";
import ProductsList from "./_components/ProductsList";

interface ProductsPageProps {
  searchParams: SearchParams;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const [brands, categories] = await Promise.all([
    fetchBrands(searchParams),
    fetchCategories(searchParams),
  ]);

  return (
    <MaxWidthWrapper className="py-20 lg:flex lg:px-8">
      <div className="lg:mr-8 xl:mr-16">
        <FilterPanel
          searchParams={searchParams}
          brands={brands}
          categories={categories}
        />
      </div>
      <div key={nanoid(10)} className="w-full">
        <Suspense fallback={<ProductsLoadingSkeleton qty={9} />}>
          <Products searchParams={searchParams} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductsPage;

const Products = async ({ searchParams }: ProductsPageProps) => {
  const products = await fetchProducts(searchParams);

  return (
    <ProductsList initialProducts={products} searchParams={searchParams} />
  );
};
