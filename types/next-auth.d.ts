import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
