import z from "zod";

const username = z
  .string()
  .min(3, "Username should be at least 3 characters long")
  .max(64, "Username shouldn't exceed 64 characters");
const email = z.email();
const password = z
  .string()
  .min(6, "Password should be at least 6 characters long");

export const registerUserValidationSchema = z.object({
  username,
  email,
  password,
});

export const LoginUserValidationSchema = z.object({
  email,
  password,
});

export const UpdateUserValidationSchema = z.object({
  username: username.optional(),
  email: email.optional(),
  password: password.optional(),
});
