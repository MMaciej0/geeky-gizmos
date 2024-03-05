import { ReactNode } from "react";
import Link from "next/link";
import { Role } from "@prisma/client";

import { cn, getUser } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface RoleGateProps {
  allowedRole: Role;
  children: ReactNode;
}

const RoleGate = async ({ allowedRole, children }: RoleGateProps) => {
  const user = await getUser();

  if (user?.role !== allowedRole) {
    return (
      <div className="space-y-10 py-10 text-center">
        <h2 className="text-2xl font-bold">
          You are not authorized to see this content.
        </h2>
        <Link
          href="/"
          className={cn(buttonVariants({ className: "w-full max-w-[350px]" }))}
        >
          Home Page
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGate;
