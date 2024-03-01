"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { KeyRound, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserPanel = () => {
  const path = usePathname();
  const router = useRouter();
  const user = null;

  return user ? (
    <Link href="/profile">Avatar</Link>
  ) : (
    <>
      <Button
        className="flex h-11 flex-col px-1"
        variant="ghost"
        disabled={path === "/sign-in"}
        onClick={() => router.push("/sign-in")}
      >
        <KeyRound className="flex-shrink-0" />
        <span className="font-semibold">Sign in</span>
      </Button>
      <Button
        className="flex h-11 flex-col px-1"
        variant="ghost"
        disabled={path === "/sign-up"}
        onClick={() => router.push("/sign-up")}
      >
        <UserPlus className="flex-shrink-0" />
        <span className="font-semibold">Sign up</span>
      </Button>
    </>
  );
};

export default UserPanel;
