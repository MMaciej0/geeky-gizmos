import { Prisma } from "@prisma/client";

export type ProductWithPayload = Prisma.ProductGetPayload<{
  include: {
    brand: {
      select: {
        name: true;
      };
    };
    categories: {
      include: {
        category: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;
