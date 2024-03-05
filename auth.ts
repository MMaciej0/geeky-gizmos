import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/validators/userValidation";
import { findUserByEmail } from "./lib/utils";
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;

          const existingAccount = await findUserByEmail(email);

          if (!existingAccount) {
            throw new Error("Incorrect email.");
          }

          if (!existingAccount.password) {
            throw new Error("This email is used to social login.");
          }

          const correctPassword = await bcrypt.compare(
            password,
            existingAccount.password,
          );

          if (!correctPassword) {
            throw new Error("Incorrect password.");
          }
          return {
            ...existingAccount,
            id: existingAccount.id.toString(),
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
