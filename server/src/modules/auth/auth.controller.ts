import { Prisma, PrismaClient } from "@prisma/client"; // Importing PrismaClient
import { AppError } from "../../middleware/errorHandler"; // AppError is assumed to be a custom error class
import { generateOTP, verifyOTP } from "../../utils/otp";
import { LogInReturnDto } from "../../types/type";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import {
  generateJWT,
  generateRefreshToken,
  verifyJWT,
  verifyRefreshJWT,
} from "../../utils/jwt";
import { Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { mailer } from "../../services/mailer";

const prisma = new PrismaClient();

const refreshAccessToken = async (refreshToken: string): Promise<any> => {
  try {
    // Verify the refresh token
    const decoded = verifyRefreshJWT(refreshToken) as any;

    const { data } = decoded;
    if (!data) throw new AppError("Invalid token", 400);

    const user = await prisma.user.findUnique({
      where: { id: data.id },
    });
    if (!user) throw new AppError("User not found", 404);

    // Generate a new access token
    const newAccessToken = generateJWT({
      id: user?.id,
      email: user?.email,
      roles: user?.roles,
    });

    return { accessToken: newAccessToken };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Refresh token expired", 401);
    }
    throw error;
  }
};

const register = async (payload: Prisma.UserCreateInput) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const extractEmailSuffix = payload.email.split("@")[1];
    const isSchoolEmail = await prisma.school.findUnique({
      where: { suffix: extractEmailSuffix },
    });

    if (!isSchoolEmail)
      throw new AppError("This email is not a school email", 400);

    const { isActive, isEmailVerified, roles, password, facultyId, ...rest } =
      payload as {
        password: string;
        [key: string]: any;
      };
    const isFaculty = await prisma.faculty.findUnique({
      where: { id: facultyId },
    });

    if (!isFaculty) throw new AppError("Faculty not found", 404);
    const auth = await prisma.user.findUnique({
      where: { email: rest.email },
    });

    if (auth) throw new AppError("This email is already in use", 400);

    const name = await prisma.user.findUnique({
      where: { email: rest.email },
    });

    if (name) throw new AppError("This name is already in use", 400);

    rest.password = await hashPassword(payload.password);

    rest.facultyId = facultyId;
    rest.schoolId = isSchoolEmail?.id;
    const user = await prisma.user.create({
      data: rest as Prisma.UserUncheckedCreateInput,
    });

    console.log(user);
    const token = generateOTP();
    const authUSer = { email: user.email, otp: token };
    const x = await prisma.auth.create({ data: authUSer });
    const mail = await mailer(
      user?.email,
      "OTP Verification",
      `<div> Hi ! Your OTP Code is <b>${token}</b></div>`,
    );

    return user;
  } catch (e) {
    throw e;
  }
};

const verify = async (
  payload: Prisma.AuthCreateInput,
): Promise<{ message: String }> => {
  try {
    const { email, otp } = payload;
    const auth = await prisma.auth.findUnique({ where: { email: email } });
    if (!auth) {
      throw new AppError("user not found", 400);
    }
    const isValidToken = await verifyOTP(otp);
    if (!isValidToken) {
      throw new AppError("Invalid OTP", 400);
    }
    const emailValid = auth?.otp === otp;
    if (!emailValid) {
      throw new AppError("Token MissMatch", 400);
    }
    const user = await prisma.user.update({
      where: { email: email },
      data: { isEmailVerified: true },
    });
    await prisma.auth.delete({ where: { email: email } });
    return {
      message:
        "Email verified successfully.Please wait for admin approval to login",
    };
  } catch (e) {
    throw e;
  }
};

const login = async (
  email: string,
  password: string,
  res: Response,
): Promise<LogInReturnDto> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        school: true,
      },
    });
    if (!user) throw new AppError("user not found", 404);
    if (!user?.isEmailVerified)
      throw new AppError("Email is not verified yet", 400);
    if (!user?.isActive)
      throw new AppError("User is not active . Please contact admin", 400);
    const isValidPw = await comparePassword(password, user?.password);
    if (!isValidPw) throw new AppError("User or password is incorrect", 400);
    const payload = {
      id: user?.id,
      email: user?.email,
      roles: user?.roles,
      schoolSuffix: "@" + user?.school?.suffix,
    };

    const accessToken = generateJWT(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.token.create({
      data: {
        refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() + Number(process.env.JWT_REFRESH_DURATION_MS),
        ),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: +(process.env.JWT_REFRESH_DURATION_MS || 0) as number,
    });

    return {
      user: {
        name: user?.fullName,
        roles: user?.roles,
        email: user?.email,
        schoolSuffix: "@" + user?.school?.suffix,
      },
      accessToken,
    };
  } catch (e) {
    throw e;
  }
};

const logout = async (
  req: Request,
  res: Response,
): Promise<{ message: string }> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Refresh token is missing", 400);
    }
    // Find and delete the refresh token from the database
    const tokenRecord = await prisma.token.findUnique({
      where: { refreshToken },
    });

    if (!tokenRecord) {
      throw new AppError("Refresh token not found", 404);
    }

    // Delete the token from the database
    await prisma.token.delete({
      where: { refreshToken },
    });

    // Clear the refresh token cookie from the client
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    console.log("logout");

    return { message: "Logged out successfully" };
  } catch (e) {
    throw e;
  }
};
const regenerateToken = async (email: string): Promise<boolean> => {
  try {
    const auth = await prisma.auth.findUnique({ where: { email: email } });
    if (!auth) throw new AppError("User is not available", 404);
    const newToken = generateOTP();
    await prisma.auth.update({
      where: { email },
      data: { otp: newToken },
    });
    await mailer(email, newToken, "OTP for Email Verification");
    return true;
  } catch (e) {
    throw e;
  }
};

const generateFbToken = async (email: string): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        isActive: true,
        isArchived: false,
      },
    });

    if (!user) throw new AppError("User is not available", 404);

    const otp = generateOTP();
    await prisma.auth.create({ data: { email, otp } });

    await mailer(email, otp, "OTP for Forget password reset");
    return true;
  } catch (e) {
    throw e;
  }
};
const regenerateFPToken = async (email: string): Promise<boolean> => {
  try {
    const auth = await prisma.auth.findUnique({ where: { email } });
    if (!auth) throw new AppError("User is not available", 404);
    const newToken = generateOTP();
    await prisma.auth.update({
      where: { email },
      data: { otp: newToken },
    });
    await mailer(email, newToken, "OTP for Forget password reset");
    return true;
  } catch (e) {
    throw e;
  }
};

const forgetPassword = async (
  email: string,
  otp: string,
  password: string,
): Promise<boolean> => {
  try {
    const auth = await prisma.auth.findUnique({ where: { email } });
    if (!auth) throw new AppError("user not found", 404);
    const isValidToken = await verifyOTP(otp);
    if (!isValidToken) throw new AppError("Token expired", 400);
    const emailValid = auth?.otp === otp;
    if (!emailValid) throw new AppError("Token mismatch", 400);
    const hashPasswords = await hashPassword(password);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashPasswords,
      },
    });
    await prisma.auth.delete({ where: { email } });
    return true;
  } catch (e) {
    throw e;
  }
};

const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("user not found", 404);
    const isValidPw = await comparePassword(oldPassword, user?.password || "");
    if (!isValidPw) throw new AppError("User or password is incorrect", 400);
    const hashPasswords = await hashPassword(newPassword);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashPasswords,
      },
    });
    return true;
  } catch (e) {
    throw e;
  }
};

export {
  verify,
  login,
  register,
  refreshAccessToken,
  logout,
  regenerateToken,
  generateFbToken,
  regenerateFPToken,
  forgetPassword,
  changePassword,
};
