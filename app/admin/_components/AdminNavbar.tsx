"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const AdminNavbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productToEdit = searchParams.get("id");

  return (
    <MaxWidthWrapper className="py-6">
      <ul className="flex justify-evenly space-x-2 rounded-md border-[1.5px] p-1">
        <li
          className={cn(
            "w-full rounded-lg text-center font-semibold transition hover:bg-accent",
            pathname === "/admin" && "bg-accent",
          )}
        >
          <Link href="/admin" className="block w-full p-2">
            Unapproved
          </Link>
        </li>
        <li
          className={cn(
            "w-full rounded-lg text-center font-semibold transition hover:bg-accent",
            pathname === "/admin/add-product" && "bg-accent",
          )}
        >
          <Link href="/admin/add-product" className="block w-full p-2">
            {productToEdit ? "Edit" : "Add"}
          </Link>
        </li>
      </ul>
    </MaxWidthWrapper>
  );
};

export default AdminNavbar;
