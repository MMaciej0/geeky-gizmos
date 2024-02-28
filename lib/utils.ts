import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSlug = (str: string) => {
  return str.trim().toLocaleLowerCase().replace(/\s+/g, " ").replace(/ /g, "-");
};

export const paramToFullSearchString = (str: string) => {
  return str
    .split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
};

export const truncateString = (
  string: string,
  query: string,
  maxLength: number,
) => {
  const lowerCasedStringArr = string.toLowerCase().split(" ");
  const word = lowerCasedStringArr.find((w) => w.includes(query));
  if (!word) return string;
  const index = lowerCasedStringArr.indexOf(word);

  const startTruncate = Math.max(0, index - Math.floor(maxLength / 2));
  const endTruncate = Math.min(string.length, startTruncate + maxLength);

  let truncatedStringArr = lowerCasedStringArr.slice(
    startTruncate,
    endTruncate,
  );

  if (startTruncate > 0) {
    truncatedStringArr.unshift("...");
  }

  if (endTruncate < string.length) {
    truncatedStringArr.push("...");
  }

  return truncatedStringArr.join(" ");
};
