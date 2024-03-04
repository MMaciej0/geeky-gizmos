"use client";

import React, { ButtonHTMLAttributes, FC } from "react";
import LoadingButton from "./LoadingButton";
import { useFormStatus } from "react-dom";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./ui/button";

interface SubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const SubmitButton: FC<SubmitButtonProps> = ({ ...props }) => {
  const { pending } = useFormStatus();
  return <LoadingButton {...props} isLoading={pending} type="submit" />;
};

export default SubmitButton;
