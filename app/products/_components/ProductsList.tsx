import ProductCard from "@/components/ProductCard";
import { ProductWithBrandPayload } from "@/types/product";
import Link from "next/link";

const ProductsList = ({
  products,
}: {
  products: ProductWithBrandPayload[];
}) => {
  return products.length === 0 ? (
    <h1 className="py-6 text-center text-2xl font-bold">
      No Products found. Please change your searching criteria.
    </h1>
  ) : (
    <section className="grid w-full grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((prod) => (
        <Link key={prod.id} href={`/products/${prod.slug}`}>
          <ProductCard product={prod} />
        </Link>
      ))}
    </section>
  );
};

export default ProductsList;
