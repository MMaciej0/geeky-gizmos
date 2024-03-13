import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <MaxWidthWrapper className="space-y-8">
      {[...Array(2)].map((v, i) => (
        <div className="m-auto flex max-w-[450px] flex-col space-y-4" key={i}>
          <div className="space-y-2">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      ))}
    </MaxWidthWrapper>
  );
};

export default LoadingPage;
