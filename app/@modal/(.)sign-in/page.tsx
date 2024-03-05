"use client";

import SignInForm from "@/app/(auth)/sign-in/_components/SignInForm";
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
      <DialogContent className="h-full overflow-y-auto p-0 md:h-auto">
        <div className="my-auto p-1 md:p-0">
          <SignInForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
