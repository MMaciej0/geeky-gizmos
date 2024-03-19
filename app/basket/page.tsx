import Link from "next/link";

import { cn } from "@/lib/utils";
import { getBasket } from "@/lib/basket";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import BasketBody from "./_components/BasketBody";

const BasketPage = async () => {
  const basket = await getBasket();

  if (!basket || basket.size === 0) {
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
        <BasketBody basket={basket} />
      </div>
    </MaxWidthWrapper>
  );
};

export default BasketPage;
