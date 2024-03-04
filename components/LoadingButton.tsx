import React, { ButtonHTMLAttributes, FC } from "react";

import { Button, buttonVariants } from "./ui/button";
import { Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";

interface LoadingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button {...props} disabled={props.disabled || isLoading}>
      <span className="flex items-center justify-center gap-1">
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
};

export default LoadingButton;
