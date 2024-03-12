"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";

import {
  convertSearchParamsToArray,
  deleteParamAndCreateSearchParams,
} from "@/lib/utils";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterResultsPanelProps {
  searchParams?: {
    [key: string]: string | string[];
  };
}

const FilterResultsPanel: FC<FilterResultsPanelProps> = ({ searchParams }) => {
  const router = useRouter();
  const formatedSearchParams = convertSearchParamsToArray(searchParams);

  if (formatedSearchParams.length === 0) return null;

  const handleDelete = (param: string) => {
    const newSearchParams = deleteParamAndCreateSearchParams(
      param,
      searchParams!,
    );

    if (newSearchParams) {
      router.push(`/products?${newSearchParams}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <section>
      <h2 className="text-2xl">Your filter criteria:</h2>
      <div className="flex flex-wrap items-center pb-12 pt-6">
        {formatedSearchParams.map((searchParam, i) => (
          <Badge
            className="cursor-pointer px-4 py-2"
            key={i}
            onClick={() => handleDelete(searchParam)}
          >
            {searchParam}
            <X size={16} className="ml-2" />
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default FilterResultsPanel;
