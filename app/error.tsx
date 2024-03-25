"use client";

import Link from "next/link";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.error(error);
  return (
    <MaxWidthWrapper className="px-6">
      <h1 className="py-20 text-center text-4xl font-bold">Error</h1>
      <p className="flex rounded-lg bg-destructive/80 p-6 text-lg">
        <AlertTriangle size={30} className="mr-8 flex-shrink-0" />
        Ops. Something went wrong.
      </p>
      <div className="my-6 space-y-4">
        <Button onClick={reset} className="w-full">
          Try again
        </Button>
        <Button asChild className="w-full">
          <Link href="/">Home Page</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default ErrorPage;
