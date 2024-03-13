"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const AdminNavbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productToEdit = searchParams.get("id");

  return (
    <MaxWidthWrapper className="py-6">
      <ul className="flex flex-col justify-evenly space-x-2 rounded-md border-[1.5px] p-1 md:flex-row">
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
            {productToEdit ? "Edit Product" : "Add Product"}
          </Link>
        </li>
        <li
          className={cn(
            "w-full rounded-lg text-center font-semibold transition hover:bg-accent",
            pathname === "/admin/add-category" && "bg-accent",
          )}
        >
          <Link href="/admin/add-category" className="block w-full p-2">
            Add category
          </Link>
        </li>
        <li
          className={cn(
            "w-full rounded-lg text-center font-semibold transition hover:bg-accent",
            pathname === "/admin/add-brand" && "bg-accent",
          )}
        >
          <Link href="/admin/add-brand" className="block w-full p-2">
            Add brand
          </Link>
        </li>
      </ul>
    </MaxWidthWrapper>
  );
};

export default AdminNavbar;
