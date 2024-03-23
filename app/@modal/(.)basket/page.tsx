"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import BasketBody from "@/app/basket/_components/BasketBody";

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
      <DialogContent className="h-full md:h-auto md:w-4/5">
        <h1 className="py-4 text-center text-3xl">Your Basket</h1>
        <div className="h-[80vh] ">
          <BasketBody />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
