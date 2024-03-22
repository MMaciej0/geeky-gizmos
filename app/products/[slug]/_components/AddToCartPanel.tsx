"use client";

import { FC, useEffect, useState } from "react";

import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useBasketStore } from "@/lib/baskett";

import { ShoppingBasket as ShoppingBasketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface AddToCartPanelProps {
  product: Product;
}

const AddToCartPanel: FC<AddToCartPanelProps> = ({ product }) => {
  const { items, addItem } = useBasketStore();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { toast } = useToast();
  const quantityOptions = Array.from(
    { length: product.stock },
    (_, i) => i + 1,
  );

  useEffect(() => {
    if (items[product.id]) {
      setSelectedQuantity(items[product.id].quantity);
    }
  }, [items]);

  const handleAddToBasketButton = () => {
    addItem(product, selectedQuantity);
    toast({
      title: `You have ${selectedQuantity}x of ${product.name} in basket!`,
    });
  };

  return (
    <div className="mx-4 py-6 text-center lg:py-10">
      <div className="m-auto grid max-w-[450px] grid-cols-1 grid-rows-2 place-content-center gap-y-1 rounded-md bg-accent p-1 lg:max-w-full lg:shadow-md">
        <div className="flex items-center space-x-1">
          <p className="flex h-10 w-full items-center justify-center rounded-md border bg-background text-center text-base font-semibold">
            {formatPrice(product.price)}
          </p>

          <Select
            value={selectedQuantity.toString()}
            onValueChange={(val) => setSelectedQuantity(Number(val))}
          >
            <SelectTrigger className="text-base font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {quantityOptions.map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Button className="w-full" onClick={handleAddToBasketButton}>
            Add to basket
            <ShoppingBasketIcon className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPanel;
