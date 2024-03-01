"use client";

import SignInForm from "@/app/sign-in/_components/SignInForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

const SignInModal = () => {
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
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
