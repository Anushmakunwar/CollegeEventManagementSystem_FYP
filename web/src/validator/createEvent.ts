import { z } from "zod";

export const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Event name must be provided." }),
    description: z.string().min(1, { message: "Description cannot be empty." }),
    hostNames: z
      .array(
        z
          .object({
            name: z.string().min(1, { message: "Host name cannot be empty." }),
          })
          .optional(),
      )
      .optional(),
    guestNames: z
      .array(
        z.object({
          name: z.string().min(1, { message: "Guest name cannot be empty." }),
        }),
      )
      .optional(),
    venue: z.string().min(1, { message: "Venue must be specified." }),
    registrationDeadline: z.coerce.date({
      required_error: "Registration deadline is required",
    }),
    startTime: z.coerce.date({
      required_error: "Event start time is required",
    }),
    endTime: z.coerce.date({
      required_error: "Event end time is required",
    }),
  })
  .refine((data) => data.registrationDeadline > new Date(), {
    path: ["registrationDeadline"],
    message: "Registration deadline must be in the future",
  })
  .refine((data) => data.startTime > data.registrationDeadline, {
    path: ["startTime"],
    message: "Event start time must be after registration deadline",
  })
  .refine((data) => data.endTime > data.startTime, {
    path: ["endTime"],
    message: "Event end time must be after event start time",
  });
