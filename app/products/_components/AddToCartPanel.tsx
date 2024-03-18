"use client";

import { FC, useOptimistic, useTransition } from "react";

import { formatPrice } from "@/lib/utils";

import { ShoppingBasket as ShoppingBasketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { addToCart } from "../[slug]/actions";
import { useToast } from "@/components/ui/use-toast";

interface AddToCartPanelProps {
  product: Product;
  inBasketItemQty: number;
}

const AddToCartPanel: FC<AddToCartPanelProps> = ({
  product,
  inBasketItemQty,
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [optimisticProductState, addOptimistic] = useOptimistic(
    {
      stock: product.stock,
      quantity: inBasketItemQty,
    },
    (state, amount: number) => {
      if (state.quantity !== state.stock) {
        return {
          ...state,
          quantity: state.quantity + amount,
        };
      }

      return state;
    },
  );

  const handleAddButton = () => {
    startTransition(async () => {
      addOptimistic(1);
      const result = await addToCart(product.id);
      if (result?.error) {
        toast({
          title: result.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="py-6 text-center lg:py-10">
      <div className="flex flex-col items-center justify-center lg:shadow-md">
        <div className="flex w-full max-w-[450px] items-center rounded-md bg-accent lg:max-w-full">
          <p className="w-full text-center text-lg font-bold">
            {formatPrice(product.price)}
          </p>
          <Button
            className="px-12"
            onClick={handleAddButton}
            disabled={
              optimisticProductState.quantity === optimisticProductState.stock
            }
          >
            {optimisticProductState.quantity ===
            optimisticProductState.stock ? (
              "Out of stock"
            ) : (
              <>
                Add to basket
                <ShoppingBasketIcon className="ml-2" size={20} />
              </>
            )}
          </Button>
        </div>
        {optimisticProductState.quantity > 0 && (
          <p className="w-full max-w-[450px] rounded-b-md bg-background p-1 font-semibold lg:max-w-full">
            {`You already have ${optimisticProductState.quantity} ${optimisticProductState.quantity > 1 ? "copies" : "copy"} of this product in your basket.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddToCartPanel;
