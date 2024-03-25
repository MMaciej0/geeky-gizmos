"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { useBasketStore } from "@/lib/basket";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DefaultLoading from "@/components/DefaultLoading";

const BasketBody: FC = () => {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
    calculateSize,
    calculateTotal,
  } = useBasketStore();

  useEffect(() => {
    useBasketStore.persist.rehydrate();
    setMounted(true);
  }, []);

  const handleMinusButton = (basketItemId: string) => {
    decreaseQuantity(basketItemId);
  };

  const handlePlusButton = (basketItemId: string) => {
    increaseQuantity(basketItemId);
  };

  const handleRemoveButton = (basketItemId: string) => {
    deleteItem(basketItemId);
  };

  if (!mounted) return <DefaultLoading />;

  if (calculateSize() === 0) {
    return (
      <div className="m-auto p-6 py-16">
        <h1 className="text-center text-3xl">
          Your basket is empty. Go ahead, grab something!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between ">
      <div className="h-full flex-grow overflow-y-auto">
        {Object.entries(items).map(([key, item]) => (
          <div key={item.product.id} className="my-4">
            <div className="grid grid-cols-2 justify-items-center gap-4 lg:justify-items-start">
              <div className="relative aspect-square h-[240px] max-w-full overflow-hidden">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  fill
                  className="object-cover"
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
                    onClick={() => handleMinusButton(key)}
                  >
                    <Minus />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handlePlusButton(key)}
                  >
                    <Plus />
                  </Button>
                </div>
                <hr />
                <p>Total: {formatPrice(item.product.price * item.quantity)}</p>
                <div className="pt-4">
                  <Button
                    className=" w-full"
                    variant="outline"
                    onClick={() => handleRemoveButton(key)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 rounded-md border p-2">
        <div className="space-y-2">
          <p className="text-lg font-bold">
            Total: {formatPrice(calculateTotal())}
          </p>
          <p>Shipping: FREE</p>
        </div>
        <hr />
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
};

export default BasketBody;
