import { getBasket } from "@/lib/basket";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import QuantityButtons from "./_components/QuantityButtons";

const BasketPage = async () => {
  const basket = await getBasket();

  if (!basket) {
    return (
      <div className="m-auto max-w-[650px] p-6 py-16">
        <h1 className="text-center text-3xl">
          Your basket is empty. Go ahead, grab something!
        </h1>
        <div className="my-10 flex flex-col md:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "my-2 w-full md:mx-2",
              }),
            )}
          >
            Home Page
          </Link>
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "my-2 w-full md:mx-2",
              }),
            )}
          >
            Products Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="py-10">
      <h1 className="text-center text-3xl">Your basket</h1>
      <div className="grid h-full grid-cols-1 lg:max-h-[80vh] lg:grid-cols-4 lg:overflow-y-auto">
        <div className="py-8 lg:col-span-3">
          {basket.items.map((item) => (
            <div key={item.id} className="my-4">
              <div className="grid grid-cols-2 justify-items-start">
                <div className="relative aspect-square h-[240px] w-full overflow-hidden">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
                  />
                </div>
                <div className="space-y-2 py-2 font-semibold">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="line-clamp-2 underline-offset-4 hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <p>Price: {formatPrice(item.product.price)}</p>
                  <QuantityButtons productQuantity={item.quantity} />
                  <hr />
                  <p>Total: {item.product.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-semibold lg:py-8">
          <div className="space-y-2 rounded-md border p-2">
            <p>Total: {formatPrice(basket.total)}</p>
            <p>Shipping: FREE</p>
            <Link
              href="/checkout"
              className={cn(buttonVariants({ className: "w-full" }))}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default BasketPage;
