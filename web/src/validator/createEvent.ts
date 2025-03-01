import { z } from "zod";

export const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Event name must be provided." }),
    description: z.string().min(1, { message: "Description cannot be empty." }),
    hostNames: z
      .array(
        z.object({
          name: z.string().min(1, { message: "Host name cannot be empty." }),
        }),
      )
      .nonempty({ message: "At least one host must be added." }),
    guestNames: z
      .array(
        z.object({
          name: z.string().min(1, { message: "Guest name cannot be empty." }),
        }),
      )
      .nonempty({ message: "At least one guest must be added." }),
    venue: z.string().min(1, { message: "Venue must be specified." }),
    registrationDeadline: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date for registration deadline.",
      }),
    startTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid event date.",
    }),
    endTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid end Time.",
    }),
  })
  .refine((data) => Date.parse(data.startTime) < Date.parse(data.endTime), {
    message: "Event date must be before event end.",
    path: ["startTime"], // Attach error to `eventDate` field.
  })
  .refine(
    (data) =>
      Date.parse(data.startTime) > Date.parse(data.registrationDeadline),
    {
      message: "Event date must be after the registration deadline.",
      path: ["startTime"], // Attach error to `eventDate` field.
    },
  );
