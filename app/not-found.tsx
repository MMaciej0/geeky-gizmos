import Link from "next/link";

import { AlertTriangle } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <MaxWidthWrapper className="px-6">
      <h1 className="py-20 text-center text-4xl font-bold">Page not found</h1>
      <p className="flex rounded-lg bg-accent p-6 text-lg">
        <AlertTriangle size={30} className="mr-8 flex-shrink-0" />
        Ops. This page does not exist.
      </p>
      <div className="my-6 space-y-4">
        <Button asChild className="w-full">
          <Link href="/">Home Page</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default NotFoundPage;
