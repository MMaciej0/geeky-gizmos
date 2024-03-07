import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="py-10">
      <MaxWidthWrapper className="space-y-8">
        {[...Array(6)].map((v, i) => (
          <div className="m-auto flex max-w-[450px] flex-col space-y-4" key={i}>
            <div className="space-y-2">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default Loading;
