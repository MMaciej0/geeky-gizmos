import { z } from "zod";

const requiredString = z.string().min(1, "This field is required.");

export const loginSchema = z.object({
  email: requiredString.regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "This is not valid email.",
  ),
  password: requiredString.regex(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()-+=?])(?=.*[a-z])[A-Za-z\d!@#$%^&*()-+=?]{8,}$/,
    "Password needs to be at least 8 characters long and contains one uppercase letter,one lowercase letter and one special character",
  ),
});

export const registerSchema = z
  .object({
    name: requiredString.regex(/^[A-Za-z\s-]{2,30}$/, "This is not valid name"),
  })
  .and(loginSchema);

export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
