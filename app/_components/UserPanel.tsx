"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "next-auth";
import { logout } from "../actions";

import {
  KeyRound,
  LogOut,
  Settings,
  User as UserIcon,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExtendedUser } from "@/types/next-auth";
import { Role } from "@prisma/client";

interface UserPanelProps {
  user: ExtendedUser | null;
}

const UserPanel: FC<UserPanelProps> = ({ user }) => {
  const path = usePathname();
  const router = useRouter();

  const onSignout = async () => {
    await logout();
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-11 px-3">
          <Avatar>
            <AvatarImage src={user.image!} />
            <AvatarFallback className="bg-transparent">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === Role.ADMIN ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem onClick={onSignout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
