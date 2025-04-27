import { AppError } from "../middleware/errorHandler";
import { verifyJWT } from "./jwt";
import { PrismaClient, User, Role } from "@prisma/client"; // Import Role from Prisma schema
import { NextFunction, request, Request, Response } from "express";

const prisma = new PrismaClient();

// Define the JWT data interface (assuming 'data' in your JWT payload is of type { email: string, roles: string[] })
interface JWTData {
  email: string;
  roles: Role[]; // Roles should be an array of Role type (which is defined as an enum in Prisma)
}

// Secure API function with roles
const secureAPI = (roles: Role[]) => {
  // `roles` should be an array of Role enums
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log(
        "====================================================================================================",
      );
      const token = req?.headers?.authorization;
      console.log(token);
      if (!token) return next(new AppError("Access token required", 500));
      const accessToken = token.split("Admin ")[1];

      const { data } = verifyJWT(accessToken) as { data: JWTData | null }; // Ensure correct typing

      if (!data) return next(new AppError("Data is not available", 404));

      const { email } = data;

      // Check if the user exists
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return next(new AppError("User not found", 404));
      }
      console.log(user, "checkuser");
      // Ensure user.id and user.roles are assigned safely
      if (user.id && user.roles) {
        (request as any).currentUser = user?.id;
        (request as any).currentUserName = user?.fullName;
        (request as any).currentRoles = user?.roles;
        (request as any).schoolId = user?.schoolId;
        (request as any).facultyId = user?.facultyId;
      } else {
        return next(new AppError("User data incomplete", 400));
      }

      // Compare the role of the user against the required role
      const isValidRole = roles.some((role) => user.roles.includes(role));
      if (!isValidRole) {
        return next(new AppError("User unauthorized", 400));
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};

export default secureAPI;
