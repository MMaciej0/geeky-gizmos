"use client";

import React, { FC } from "react";
import { useFormState } from "react-dom";

import { deleteProductAction, publishProductAction } from "../actions";

import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface AdminPanelProps {
  productId: number;
}

const AdminPanel: FC<AdminPanelProps> = ({ productId }) => {
  return (
    <div className="flex space-x-4 p-4">
      <div className="w-full">
        <PublishButton productId={productId} />
      </div>
      <div className="w-full">
        <DeleteButton productId={productId} />
      </div>
      <div className="w-full">
        <Link
          href={`/admin/add-product?id=${productId.toString()}`}
          className={cn(buttonVariants({ className: "w-full" }))}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;

const PublishButton = ({ productId }: { productId: number }) => {
  const [formState, formAction] = useFormState(publishProductAction, undefined);

  return (
    <form action={formAction}>
      <input hidden name="productId" defaultValue={productId} />
      <SubmitButton className="w-full">Publish</SubmitButton>
      {formState?.error && formState.error}
    </form>
  );
};

const DeleteButton = ({ productId }: { productId: number }) => {
  const [formState, formAction] = useFormState(deleteProductAction, undefined);
  return (
    <form action={formAction}>
      <input hidden name="productId" defaultValue={productId} />
      <SubmitButton className="w-full" variant="destructive">
        Delete
      </SubmitButton>
      {formState?.error && formState.error}
    </form>
  );
};
