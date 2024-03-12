"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import { Product } from "@prisma/client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Multiselect from "@/components/ui/multiselect";
import { Label } from "@/components/ui/label";
import { convertToSelectable, createURLSearchParams } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useRouter } from "next/navigation";

interface FilterPanelProps {
  products: Product[];
  searchParams?: {
    [key: string]: string | string[];
  };
}

const FilterPanel: FC<FilterPanelProps> = ({ products, searchParams }) => {
  const router = useRouter();
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    return Array.isArray(searchParams?.brand)
      ? searchParams.brand
      : typeof searchParams?.brand === "string"
        ? [searchParams.brand]
        : [];
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    return Array.isArray(searchParams?.category)
      ? searchParams.category
      : typeof searchParams?.category === "string"
        ? [searchParams.category]
        : [];
  });

  const debouncedBrands = useDebounce(selectedBrands);
  const debouncedCategories = useDebounce(selectedCategories);

  useEffect(() => {
    const newSearchParams = {
      ...searchParams,
      brand: debouncedBrands,
      category: debouncedCategories,
    };

    const newURLSearchParams = createURLSearchParams(newSearchParams);

    router.push(`/products?${newURLSearchParams}`);
  }, [debouncedBrands, debouncedCategories]);

  const brands = useMemo(() => {
    return convertToSelectable(products.map((prod) => prod.brand));
  }, [products]);
  const categories = useMemo(() => {
    const prodCategories = products.flatMap((prod) => prod.category.split(","));
    return convertToSelectable(prodCategories);
  }, [products]);

  return (
    <div className="ml-auto flex w-full space-x-2 pb-6 md:max-w-[250px]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="lg" className="text-md w-full">
            Sort & Filter
            <SlidersHorizontal size={20} className="ml-2" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <form>
            <div>
              <Label>Brands</Label>
              <Multiselect
                selectables={brands}
                selected={selectedBrands}
                setSelected={(selectables) => setSelectedBrands(selectables)}
                placeholder="Select brands..."
              />
            </div>
            <div>
              <Label>Categories</Label>
              <Multiselect
                selectables={categories}
                selected={selectedCategories}
                setSelected={(selectables) =>
                  setSelectedCategories(selectables)
                }
                placeholder="Select category..."
              />
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterPanel;
