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

interface AddToCartPanelProps {
  product: Product;
}

const AddToCartPanel: FC<AddToCartPanelProps> = ({ product }) => {
  const { items, addItem } = useBasketStore();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const quantityOptions = Array.from(
    { length: product.stock },
    (_, i) => i + 1,
  );

  useEffect(() => {
    if (items[product.id]) {
      setSelectedQuantity(items[product.id].quantity);
    }
  }, [items]);

  return (
    <div className="mx-4 py-6 text-center lg:py-10">
      <div className="m-auto grid max-w-[450px] grid-cols-1 grid-rows-2 place-content-center gap-y-1 rounded-md bg-accent p-1 lg:max-w-full lg:shadow-md">
        <div className="flex items-center space-x-1">
          <p className="w-full rounded-md border bg-background py-1 text-center text-lg font-bold">
            {formatPrice(product.price)}
          </p>

          <Select
            value={selectedQuantity.toString()}
            onValueChange={(val) => setSelectedQuantity(Number(val))}
          >
            <SelectTrigger>
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
          <Button
            className="w-full"
            onClick={() => addItem(product, selectedQuantity)}
          >
            Add to basket
            <ShoppingBasketIcon className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPanel;
