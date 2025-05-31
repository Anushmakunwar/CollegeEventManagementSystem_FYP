import { z } from "zod";

export const FormSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z
    .array(z.enum(["SCHOOLADMIN"]))
    .length(1, "Role must have exactly one value")
    .optional(), // ✅ Enforces array with only one role
});

export const AdminFormSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z
    .array(z.enum(["ADMIN"]))
    .length(1, "Role must have exactly one value")
    .optional(), // ✅ Enforces array with only one role
});
