import { twMerge } from "tailwind-merge";
import Crypto from "crypto-js";
import { type ClassValue, clsx } from "clsx";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Callback = (...args: any[]) => Promise<any>;

export const cache = <T extends Callback>(
  callback: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] },
) => {
  return nextCache(reactCache(callback), keyParts, options);
};

export const toSlug = (str: string) => {
  return str.trim().toLocaleLowerCase().replace(/\s+/g, " ").replace(/ /g, "-");
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

export const createURLSearchParams = (params: {
  [key: string]: string | string[];
}) => {
  const newSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((val) => newSearchParams.append(key, val));
    } else if (value !== "") {
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

export const encryptString = (str: string) => {
  try {
    return Crypto.AES.encrypt(str, process.env.CRYPTO_KEY!).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Encryption failed.");
  }
};

export const decryptData = (encryptedString: string) => {
  try {
    const bytes = Crypto.AES.decrypt(encryptedString, process.env.CRYPTO_KEY!);
    return bytes.toString(Crypto.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed.");
  }
};
