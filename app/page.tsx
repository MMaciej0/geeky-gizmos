import Link from "next/link";
import { Suspense } from "react";

import prisma from "@/lib/prisma";
import { cache } from "@/lib/utils";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Footer from "./_components/Footer";
import CategoriesGrid, {
  CategoriesSkeleton,
} from "./_components/CategoriesGrid";
import ProductSlider, {
  ProductSliderLoadingSkeleton,
} from "@/components/ProductSlider";

const newestProductsFetcher = cache(
  () =>
    prisma.product.findMany({
      where: { approved: true },
      include: {
        brand: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ["/", "newestProductsFetcher"],
  { revalidate: 60 * 60 * 24 },
);

const categoriesFetcher = cache(
  () =>
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ["/", "categoriesFetcher"],
  { revalidate: 60 * 60 * 24 },
);

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper className="space-y-10">
        <header className="mx-auto flex flex-col items-center bg-accent p-4 pb-20 pt-14 text-center lg:pt-20">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
            Your Marketplace for high-quality gizmos.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to Geeky Bazzar. Where the craziest contraptions meet the
            nerdiest brains!
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="link">Our quality promise &rarr;</Button>
          </div>
        </header>
        <section>
          <h3 className="my-4 px-4 text-2xl font-bold">Newest</h3>
          <Suspense fallback={<ProductSliderLoadingSkeleton />}>
            <ProductSlider productsFetcher={newestProductsFetcher} />
          </Suspense>
        </section>
        <section>
          <h3 className="my-4 px-4 text-2xl font-bold">Categories</h3>
          <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesGrid categoriesFetcher={categoriesFetcher} />
          </Suspense>
        </section>
      </MaxWidthWrapper>
      <div className="bg-accent pb-10">
        <MaxWidthWrapper className="mt-10">
          <Footer />
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
