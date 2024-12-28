import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      currentUser?: string;
      currentUserName?: string;
      currentRoles?: string[]; // Type for user roles, as an array of strings (or undefined)
    }
  }
}
