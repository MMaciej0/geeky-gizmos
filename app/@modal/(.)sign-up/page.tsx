"use client";

import SignUpForm from "@/app/sign-up/_components/SignUpForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

const SignUpModal = () => {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };
  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onDismiss();
        }
      }}
    >
      <DialogContent className="p-0">
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
