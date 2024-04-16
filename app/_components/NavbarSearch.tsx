"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useRouter } from "next/navigation";

import { Loader2, Search } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { SearchResult, searchProducts } from "../actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createURLSearchParams } from "@/lib/utils";

const NavbarSearch = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearchValue.length >= 3) {
      setIsLoading(true);
      setSearchResult(null);
      searchProducts(debouncedSearchValue)
        .then((data) => setSearchResult(data))
        .catch((error) => {
          console.error("Error searching:", error);
          setSearchResult(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setSearchResult(null);
    }
  }, [debouncedSearchValue]);

  const handleRedirect = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="h-11 px-3" variant="ghost" role="combobox">
          <Search />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          shouldFilter={false}
          className="h-auto w-[350px] rounded-lg border border-b-0 shadow-md"
        >
          <CommandInput
            value={searchValue}
            onValueChange={setSearchValue}
            placeholder="Search..."
          />
          <CommandList>
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 size={25} className="animate-spin" />
              </div>
            )}
            {!isLoading &&
              !searchResult &&
              debouncedSearchValue.length >= 3 && (
                <p className="mt-3 p-2 text-center text-sm">No results.</p>
              )}
            {debouncedSearchValue.length < 3 && (
              <p className="mt-3 p-2 text-center text-sm">
                The search value must be at least 3 characters.
              </p>
            )}

            {searchResult && (
              <>
                {searchResult.productsByName &&
                  searchResult.productsByName.length > 0 && (
                    <>
                      <CommandGroup heading="Product names matching your search:">
                        {searchResult.productsByName?.map(
                          ({ name, id, slug }) => {
                            return (
                              <Button
                                variant="ghost"
                                key={id}
                                onClick={() =>
                                  handleRedirect(
                                    `/products/${encodeURIComponent(slug)}`,
                                  )
                                }
                                className="w-full justify-start"
                              >
                                {name}
                              </Button>
                            );
                          },
                        )}
                        {searchResult.productsByNameCounter! >
                          searchResult.productsByName.length && (
                          <p
                            className="cursor-pointer px-2 py-1.5 text-xs font-semibold underline"
                            onClick={() =>
                              handleRedirect(
                                `/products?${createURLSearchParams({ name: searchValue })}}`,
                              )
                            }
                          >
                            See all products whose name matches your search -{" "}
                            {searchResult.productsByNameCounter}
                          </p>
                        )}
                      </CommandGroup>
                      <hr />
                    </>
                  )}

                {searchResult.brands && searchResult.brands.length > 0 && (
                  <>
                    <CommandGroup heading="Product brands matching your search:">
                      {searchResult.brands?.map((brand) => {
                        return (
                          <Button
                            variant="ghost"
                            key={brand}
                            onClick={() =>
                              handleRedirect(
                                `/products?${createURLSearchParams({ brand })}}`,
                              )
                            }
                            className="w-full justify-start"
                          >
                            {brand}
                          </Button>
                        );
                      })}
                    </CommandGroup>
                    <hr />
                  </>
                )}

                {searchResult.category && searchResult.category.length > 0 && (
                  <>
                    <CommandGroup heading="Categories matching your search:">
                      {searchResult.category?.map((category) => {
                        return (
                          <Button
                            variant="ghost"
                            key={category}
                            onClick={() =>
                              handleRedirect(
                                `/products?${createURLSearchParams({ category })}`,
                              )
                            }
                            className="w-full justify-start"
                          >
                            {category}
                          </Button>
                        );
                      })}
                    </CommandGroup>
                    <hr />
                  </>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarSearch;
