"use client";

import React, { FC, useOptimistic, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";

import { ShoppingBasket } from "@/lib/basket";
import { formatPrice } from "@/lib/utils";
import { reducer } from "../reducer";
import { changeBasketItemQuantity } from "../actions";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

interface BasketBodyProps {
  basket: ShoppingBasket;
}

const BasketBody: FC<BasketBodyProps> = ({ basket }) => {
  const [isPending, startTransition] = useTransition();
  const [basketState, dispatch] = useOptimistic(basket, reducer);

  const handleMinusButton = (basketItemId: number) => {
    startTransition(async () => {
      dispatch({ type: "DECREASE", payload: { basketItemId } });
      await changeBasketItemQuantity(basketItemId, "decrease");
    });
  };

  const handlePlusButton = (basketItemId: number) => {
    startTransition(async () => {
      dispatch({ type: "INCREASE", payload: { basketItemId } });
      await changeBasketItemQuantity(basketItemId, "increase");
    });
  };

  return (
    <>
      <div className="py-8 lg:col-span-3">
        {basketState.items
          .sort((a, b) => b.product.price - a.product.price)
          .map((item) => (
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
                  <div className="flex items-center space-x-4 py-2 ">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleMinusButton(item.id)}
                    >
                      <Minus />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handlePlusButton(item.id)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <hr />
                  <p>
                    Total: {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="lg:py-8">
        <div className="space-y-2 rounded-md border p-2">
          <div className="space-y-2">
            <p className="text-lg font-bold">
              Total: {formatPrice(basketState.total)}
            </p>
            <p>Shipping: FREE</p>
          </div>
          <hr />
          <LoadingButton isLoading={isPending} className="w-full">
            Checkout
          </LoadingButton>
        </div>
      </div>
    </>
  );
};

export default BasketBody;
