import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { ShoppingBasket, User } from "lucide-react";
import NavbarSearch from "./NavbarSearch";
import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const user = null;
  return (
    <nav className="sticky top-0 z-50 w-full">
      <MaxWidthWrapper>
        <div className="flex items-center rounded-b-lg p-2 backdrop-blur-md">
          <Link href="/" className="flex flex-1 items-center">
            <Icons.logo className="h-12 w-12" />
            <p className="flex flex-col">
              <span className="hidden text-lg font-black leading-none tracking-tighter md:inline-block">
                Geeky
              </span>
              <span className="hidden text-lg font-black leading-none tracking-tighter md:inline-block">
                Bazzar
              </span>
            </p>
          </Link>
          <div className="flex items-center space-x-3">
            <NavbarSearch />
            <Link
              href="/cart"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "relative flex h-11 flex-col items-center justify-center",
                }),
              )}
            >
              <ShoppingBasket className="flex-shrink-0" />
              <Badge className="absolute right-[5px] top-0 px-[5px] py-0">
                0
              </Badge>
              <span className="font-semibold leading-none">$0.00</span>
            </Link>
            {user ? (
              <Link href="/profile">Avatar</Link>
            ) : (
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "flex h-11 flex-col",
                  }),
                )}
              >
                <User className="flex-shrink-0" />
                <span className="font-semibold">Sign in</span>
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
