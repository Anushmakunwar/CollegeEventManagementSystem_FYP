import { z } from "zod";

export const FormSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z
    .array(z.enum(["SCHOOLADMIN", "ADMIN"]))
    .length(1, "Role must have exactly one value"), // ✅ Enforces array with only one role
});
