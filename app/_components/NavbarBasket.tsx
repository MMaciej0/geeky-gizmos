"use client";

import { useEffect } from "react";
import Link from "next/link";

import { cn, formatPrice } from "@/lib/utils";
import { useBasketStore } from "@/lib/baskett";

import { buttonVariants } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NavbarBasket = () => {
  const { calculateSize, calculateTotal } = useBasketStore();

  useEffect(() => {
    useBasketStore.persist.rehydrate();
  }, []);

  return (
    <Link
      href="/basket"
      className={cn(
        buttonVariants({
          variant: "ghost",
          className: "relative flex h-11 flex-col items-center justify-center",
        }),
      )}
    >
      <ShoppingBasket className="flex-shrink-0" />
      <Badge className="absolute right-[5px] top-0 px-[5px] py-0">
        {calculateSize()}
      </Badge>
      <span className="font-semibold leading-none">
        {formatPrice(calculateTotal())}
      </span>
    </Link>
  );
};

export default NavbarBasket;
