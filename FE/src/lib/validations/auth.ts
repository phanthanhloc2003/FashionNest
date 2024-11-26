import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
