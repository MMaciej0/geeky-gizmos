"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { KeyRound, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import { FC } from "react";

interface UserPanelProps {
  user: User | null;
}

const UserPanel: FC<UserPanelProps> = ({ user }) => {
  const path = usePathname();
  const router = useRouter();

  return user ? (
    <Link href="/profile">{user.name}</Link>
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
