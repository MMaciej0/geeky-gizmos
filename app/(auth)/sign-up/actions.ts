"use server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import {
  TRegisterSchema,
  registerSchema,
} from "@/lib/validators/userValidation";
import { signIn } from "@/auth";
import { findUserByEmail } from "@/lib/utils";

export const register = async (formData: TRegisterSchema) => {
  const validatedCredentials = registerSchema.safeParse(formData);

  if (!validatedCredentials.success) {
    return {
      error: "Invalid credentials.",
    };
  }

  const { name, password, email } = validatedCredentials.data;

  try {
    const emailExist = await findUserByEmail(email);

    if (emailExist) {
      return {
        error: "Email already in use. Please choose a different email address.",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser)
      return {
        error: "Something went wrong, please try again later.",
      };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong, please try again later.",
    };
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
};
