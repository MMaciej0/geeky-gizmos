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
    <MaxWidthWrapper className="pb-8">
      <h1 className="my-6 text-center text-3xl">Your basket</h1>
      <BasketBody basket={basket} />
    </MaxWidthWrapper>
  );
};

export default BasketPage;
