import { z } from "zod";

export const FormSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  location: z.string().min(1, { message: "Location cannot be empty" }),
  suffix: z.string().min(1, { message: "Suffix cannot be empty" }),
  // password: z.string().min(8, { message: "Too short" }),
});
