import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

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
