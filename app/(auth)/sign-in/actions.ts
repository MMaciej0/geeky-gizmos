"use server";

import { signIn } from "@/auth";
import { TLoginSchema, loginSchema } from "@/lib/validators/userValidation";
import { AuthError } from "next-auth";

export const login = async (
  credentials: TLoginSchema,
  callbackUrl: string | null,
) => {
  const validatedCredentials = loginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    throw new Error("Invalid credentials.");
  }

  const { email, password } = validatedCredentials.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl ?? "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.cause?.err?.message,
      };
    }
    throw error;
  }
};

export const signInWithWithGoogle = async (callbackUrl: string | null) => {
  try {
    await signIn("google", {
      redirectTo: callbackUrl ?? "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.cause?.err?.message,
      };
    }
    throw error;
  }
};
