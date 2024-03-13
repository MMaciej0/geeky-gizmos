import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          href={`/products?category=${category.id}`}
          key={category.id}
          className={cn(
            "group relative flex min-h-[100px] items-center justify-center overflow-hidden rounded-md md:min-h-[150px]",
          )}
        >
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={category.name}
            src={category.imageUrl}
            className=" object-cover opacity-50 transition-opacity group-hover:opacity-100"
            fill
          />
          <h3 className="absolute rounded-md bg-accent p-1 text-center text-lg font-semibold">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesGrid;
