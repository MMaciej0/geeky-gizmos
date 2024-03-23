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

export type ProductWithBrandAndCategoryNamePayload = Prisma.ProductGetPayload<{
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
