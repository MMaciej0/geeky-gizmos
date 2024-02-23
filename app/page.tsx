import Link from "next/link";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main>
      <div className="bg-accent">
        <MaxWidthWrapper>
          <div className="mx-auto flex max-w-3xl flex-col items-center pb-20 pt-14 text-center lg:pt-20">
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
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <Footer />
      </MaxWidthWrapper>
    </main>
  );
}
