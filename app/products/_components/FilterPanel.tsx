"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Brand, Category } from "@prisma/client";
import { cn, convertToSelectable, createURLSearchParams } from "@/lib/utils";
import { SearchParams } from "../page";
import { useDebounce } from "@/lib/hooks/useDebounce";

import { X } from "lucide-react";
import Multiselect from "@/components/ui/multiselect";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterPanelProps {
  searchParams: SearchParams;
  brands: Brand[];
  categories: Category[];
}

const FilterPanel: FC<FilterPanelProps> = ({
  searchParams,
  brands,
  categories,
}) => {
  const router = useRouter();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [sortMethod, setSortMethod] = useState(searchParams.sort || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    Array.isArray(searchParams.brand)
      ? [...searchParams.brand]
      : searchParams.brand
        ? [searchParams.brand]
        : [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    Array.isArray(searchParams.category)
      ? [...searchParams.category]
      : searchParams.category
        ? [searchParams.category]
        : [],
  );

  const debouncedBrands = useDebounce(selectedBrands);
  const debouncedCategories = useDebounce(selectedCategories);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender) {
      initialRender.current = false;
      return;
    }

    const newSearchParams = {
      ...searchParams,
      brand: debouncedBrands,
      category: debouncedCategories,
      sort: sortMethod,
    };

    const newURLSearchParams = createURLSearchParams(newSearchParams);
    router.push(`/products?${newURLSearchParams}`);
  }, [debouncedBrands, debouncedCategories, sortMethod]);

  return (
    <section className="mb-16">
      <Button
        variant="outline"
        className="w-full lg:hidden"
        onClick={() => setFiltersVisible(true)}
      >
        Filters & Sorting
      </Button>
      <div className={cn(filtersVisible && "fixed inset-0 z-50 bg-black/80")}>
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-50 h-full w-full translate-x-full gap-4 border-l bg-background p-6 shadow-lg transition duration-300 ease-in-out animate-out slide-out-to-right sm:max-w-[450px] lg:static lg:w-[320px] lg:translate-x-0 lg:animate-none lg:rounded-lg lg:border",
            filtersVisible &&
              "translate-x-0 duration-500 animate-in slide-in-from-right",
          )}
        >
          <div className="relative border-b p-6">
            <h2 className="text-center text-2xl font-bold">Filters</h2>
            <Button
              onClick={() => setFiltersVisible(false)}
              size="icon"
              variant="ghost"
              className="absolute right-[1.5rem] top-[1.5rem] lg:hidden"
            >
              <X />
            </Button>
          </div>
          <div className="m-auto flex max-w-[450px] flex-col space-y-8 px-2 py-6">
            <div>
              <Label>Brands</Label>
              <Multiselect
                selectables={convertToSelectable(brands.map((b) => b.name))}
                selected={convertToSelectable(selectedBrands)}
                setSelected={(s) => setSelectedBrands(s.map((s) => s.label))}
                placeholder="Select brand..."
              />
            </div>
            <div>
              <Label>Categories</Label>
              <Multiselect
                selectables={convertToSelectable(categories.map((c) => c.name))}
                selected={convertToSelectable(selectedCategories)}
                setSelected={(s) =>
                  setSelectedCategories(s.map((s) => s.label))
                }
                placeholder="Select category..."
              />
            </div>
            <div>
              <Label>Sort</Label>
              <Select
                onValueChange={(val) => setSortMethod(val)}
                defaultValue={sortMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort method..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="cheapest">Cheapest</SelectItem>
                  <SelectItem value="expensive">Most Expensive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterPanel;
