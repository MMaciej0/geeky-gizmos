"use client";

import React, { FC, useRef, useState } from "react";
import { Command, CommandGroup, CommandItem } from "./command";
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "./badge";
import { X } from "lucide-react";

type Selectable = Record<"value" | "label", string>;

interface multiselectProps {
  selectables: Selectable[];
  selected: string[];
  setSelected: (selectables: string[]) => void;
  placeholder?: string;
}

const Multiselect: FC<multiselectProps> = ({
  selectables,
  selected,
  setSelected,
  placeholder,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const searchInput = searchInputRef.current;

    if (searchInput) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (searchValue === "") {
          const newSelected = [...selected];
          newSelected.pop();
          setSelected(newSelected);
        }
      }
      if (e.key === "Escape") {
        searchInput.blur();
      }
    }
  };

  const handleUnselect = (value: string) => {
    const newSelected = selected.filter((selectable) => selectable !== value);
    setSelected(newSelected);
  };

  const unselectedSelectables = selectables.filter(
    (selectable) => !selected.includes(selectable.value),
  );

  return (
    <Command
      className="overflow-visible bg-transparent"
      onKeyDown={handleKeyDown}
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((selected) => (
            <Badge key={selected}>
              {selected}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(selected);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(selected)}
              >
                <X size={16} />
              </button>
            </Badge>
          ))}

          <CommandPrimitive.Input
            ref={searchInputRef}
            value={searchValue}
            onValueChange={setSearchValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder || "Select..."}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        {open && unselectedSelectables.length > 0 ? (
          <div className="absolute top-2 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {unselectedSelectables.map((selectable) => (
                <CommandItem
                  className={"cursor-pointer"}
                  key={selectable.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={(val) => {
                    setSearchValue("");
                    const newSelected = [...selected, selectable.value];
                    setSelected(newSelected);
                  }}
                >
                  {selectable.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

export default Multiselect;
