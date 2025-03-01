import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    currentUser?: string;
    currentUserName?: string;
    currentRoles?: string[]; // Adjust the type based on your roles definition
    schoolId?: string;
    facultyId?: string;
  }
}
