import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(10, "password must be atleast 10 character")
    .max(100),
});

export type TsignUpSchema = z.infer<typeof signInSchema>;
