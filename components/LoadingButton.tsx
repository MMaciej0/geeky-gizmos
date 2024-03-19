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
      {isLoading ? <Loader2 size={26} className="animate-spin" /> : children}
    </Button>
  );
};

export default LoadingButton;
