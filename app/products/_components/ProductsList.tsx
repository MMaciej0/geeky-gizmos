"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { SearchParams, fetchProducts } from "../actions";

import ProductCard from "@/components/ProductCard";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";

import { type ProductWithBrandPayload } from "@/types/product";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const ProductsList = ({
  initialProducts,
  searchParams,
}: {
  initialProducts: ProductWithBrandPayload[];
  searchParams: SearchParams;
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [allProductLoaded, setAllProductsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  const fetchMoreProducts = async () => {
    setIsLoading(true);
    const next = page + 1;
    const additionalProducts = await fetchProducts(searchParams, next);
    if (additionalProducts.length) {
      setProducts((initial) => [...initial, ...additionalProducts]);
      setPage(next);
    } else {
      setAllProductsLoaded(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && !allProductLoaded) {
      fetchMoreProducts();
    }
  }, [inView, allProductLoaded]);

  return products.length === 0 ? (
    <h1 className="py-6 text-center text-2xl font-bold">
      No Products found. Please change your searching criteria.
    </h1>
  ) : (
    <>
      <section className="grid w-full grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((prod) => (
          <Link key={prod.id} href={`/products/${prod.slug}`}>
            <ProductCard product={prod} />
          </Link>
        ))}
      </section>
      {!allProductLoaded && !isLoading && (
        <div className="my-6" ref={ref}>
          <ProductsLoadingSkeleton qty={3} />
        </div>
      )}
      <ScrollToTopButton />
    </>
  );
};

export default ProductsList;
