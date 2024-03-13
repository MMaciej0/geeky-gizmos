import { Prisma } from "@prisma/client";

export type ProductWithBrandPayload = Prisma.ProductGetPayload<{
  include: {
    brand: {
      select: {
        name: true;
      };
    };
  };
}>;
