import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSlug = (str: string) => {
  return str.trim().toLocaleLowerCase().replace(/\s+/g, " ").replace(/ /g, "-");
};
