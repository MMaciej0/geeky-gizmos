import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import prisma from "./lib/prisma";
import { loginSchema } from "./lib/validators/userValidation";
import { findUserByEmail, findUserById } from "./lib/utils";

import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

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
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.role) {
        session.user.role = token.role as Role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const currentUser = await findUserById(token.sub);

      if (!currentUser) return token;

      token.role = currentUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  ...authConfig,
});
