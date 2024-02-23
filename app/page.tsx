import Link from "next/link";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Footer from "./_components/Footer";
import CategoriesGrid from "./_components/CategoriesGrid";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
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
        <section className="my-10">
          <CategoriesGrid />
        </section>
      </MaxWidthWrapper>
      <div className="bg-accent pb-10">
        <MaxWidthWrapper>
          <Footer />
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
