import React, { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn("m-auto w-full max-w-screen-xl px-2 md:px-20", className)}
    />
  );
};

export default MaxWidthWrapper;
