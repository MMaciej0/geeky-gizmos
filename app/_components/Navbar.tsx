import React from "react";
import Link from "next/link";

import { cn, getUser } from "@/lib/utils";

import { ShoppingBasket } from "lucide-react";
import NavbarSearch from "./NavbarSearch";
import UserPanel from "./UserPanel";
import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Navbar = async () => {
  const user = await getUser();
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl">
      <MaxWidthWrapper>
        <div className="flex items-center rounded-b-lg p-2 ">
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
          <div className="flex items-center space-x-1 md:space-x-4">
            <NavbarSearch />
            <Link
              href="/basket"
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
            <UserPanel user={user} />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
