import * as jwt from "jsonwebtoken";
import { Payload } from "../types/type";
import { AppError } from "../middleware/errorHandler";

export const generateJWT = (payload: object) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET || "",
    { expiresIn: process.env.JWT_DURATION },
  );
};

export const generateRefreshToken = (payload: Payload) => {
  return jwt.sign({ data: payload }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_DURATION,
  });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      new AppError("Access token expired", 401);
    }
    new AppError("Invalid access token", 400);
  }
};
