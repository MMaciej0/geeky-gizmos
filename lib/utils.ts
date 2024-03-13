import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { SearchParams } from "@/app/products/page";

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

export const getUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return session.user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return null;
  return user;
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user) return null;
  return user;
};

export const findProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: {
        select: {
          name: true,
        },
      },
      categories: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (!product) return null;
  return product;
};

export const findProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      brand: {
        select: {
          name: true,
        },
      },
      categories: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (!product) return null;
  return product;
};

export const formatPrice = (price: number) => {
  if (Number.isInteger(price)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }
};

export const isEmptySearchParams = (searchParams: SearchParams) => {
  if (!searchParams || typeof searchParams !== "object") return true;

  if (Object.keys(searchParams).length === 0) return true;

  for (const [, value] of Object.entries(searchParams)) {
    if (
      (typeof value === "string" && !value.trim()) ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return true;
    }
  }

  return false;
};

export const convertSearchParamsToArray = (searchParams: SearchParams) => {
  if (isEmptySearchParams(searchParams)) return [];

  return Object.values(searchParams!).flatMap((searchParam) => {
    if (Array.isArray(searchParam)) {
      return searchParam.filter((p) => typeof p === "string" && p !== "");
    } else if (typeof searchParam === "string" && searchParam !== "") {
      return [searchParam];
    } else {
      return [];
    }
  });
};

export const deleteParamAndCreateSearchParams = (
  param: string,
  searchParams: SearchParams,
) => {
  const updatedSearchParams: { [key: string]: string | string[] } = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      if (value !== param) updatedSearchParams[key] = value;
    } else if (Array.isArray(value)) {
      const newValue = value.filter((v) => v !== param);
      if (newValue.length > 0) updatedSearchParams[key] = newValue;
    }
  }

  if (Object.keys(updatedSearchParams).length > 0) {
    return createURLSearchParams(updatedSearchParams);
  }
};

export const createURLSearchParams = (params: {
  [key: string]: string | string[];
}) => {
  const newSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((val) => newSearchParams.append(key, val));
    } else {
      newSearchParams.append(key, value);
    }
  }
  return newSearchParams;
};

export const convertToSelectable = (
  data: string[],
): { label: string; value: string }[] => {
  const uniqueRecords = new Set<string>();

  return data
    .map((d) => {
      const label = capitalizeFirstLetter(d);
      const value = d.toLowerCase();

      const recordKey = `${label}_${value}`;
      if (!uniqueRecords.has(recordKey)) {
        uniqueRecords.add(recordKey);
        return { label, value };
      }
      return null;
    })
    .filter(Boolean) as { label: string; value: string }[];
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
