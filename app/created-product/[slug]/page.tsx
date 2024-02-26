import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface CreatedProductPageProps {
  params: {
    slug: string;
  };
}

const CreatedProductPage = async ({
  params: { slug },
}: CreatedProductPageProps) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    return notFound();
  }

  if (product.approved) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl">
          This product has been successfully published.
        </h1>
        <div className="m-auto flex flex-col space-y-4 py-16 md:max-w-[450px]">
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href={`product/${product.slug}`}
          >
            Sale announcement
          </Link>
          <Link className={cn(buttonVariants({ variant: "outline" }))} href="/">
            Home Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="space-y-20 py-20 text-center md:max-w-[750px]">
      <h1 className="text-2xl">
        Your product, "{product.name}", has been successfully created. Before it
        can be published, it needs to be accepted by the administrator. But
        don't worry, it won't be long. Check back soon!
      </h1>
      <Link
        className={cn(
          buttonVariants({ variant: "outline", className: "w-full" }),
        )}
        href="/"
      >
        Home Page
      </Link>
    </MaxWidthWrapper>
  );
};

export default CreatedProductPage;
