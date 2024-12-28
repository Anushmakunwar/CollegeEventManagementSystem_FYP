import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  errors: string[];

  constructor(errors: string[]) {
    super("Validation Error", 400);
    this.errors = errors;
  }
}

// Correct error handler signature for Express middleware
const ErrorHandler = (
  err: any, // The `any` type allows flexibility for different error types
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // No return type, just modify the response directly
  // Handle Prisma Client Known Request Errors (database-related errors)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = err.code === "P2002" ? 409 : 400; // Unique constraint violation (P2002) or general database error
    const message =
      err.message ||
      "A database error occurred while interacting with the PostgreSQL database.";

    // Directly send the response without returning anything
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message,
      prismaError: {
        code: err.code, // Prisma error code (e.g., P2002 for unique constraint violations)
        meta: err.meta, // Meta information (e.g., which fields caused the error)
      },
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
    return; // No return, just ensure the function stops here
  }

  // Handle Prisma Client Validation Errors (validation issues in Prisma)
  if (err instanceof Prisma.PrismaClientValidationError) {
    const statusCode = 400;
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message:
        err.message ||
        "A validation error occurred while processing the Prisma query.",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
    return; // Stop here after sending the response
  }

  // Handle custom AppError (for operational errors)
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  const response = {
    success: false,
    status: statusCode,
    message,
    ...(err instanceof ValidationError && { errors: err.errors }),
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(statusCode).json(response); // Send the response
};

export { ErrorHandler, AppError, ValidationError };
