import { Prisma, PrismaClient } from "@prisma/client"; // Importing PrismaClient
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { mailer } from "../../services/mailer";
import { getReturn } from "../../types/type";
import { AppError } from "../../middleware/errorHandler";
import { generateEmailMarkup } from "../../utils/welcomeEmailTemplate";
const prisma = new PrismaClient();

const createUser = async (
  roles: string[],
  schoolId: string,
  facultyId?: string,
  //@ts-ignore
  payload: Prisma.UserCreateInput,
): Promise<Prisma.UserCreateInput | null> => {
  try {
    if (!roles.length) throw new Error("Roles array cannot be empty");

    const {
      password,
      roles: inputRoles,
      schoolId: inputSchoolId,
      ...rest
    } = payload as {
      password: string;
      roles?: string[];
      schoolId?: string;
      [key: string]: any;
    };

    rest.password = await hashPassword(password);
    rest.isEmailVerified = true;
    rest.isActive = true;

    let school;
    if (schoolId) {
      school = await prisma.school.findUnique({
        where: {
          id: schoolId,
        },
      });
      if (!rest.email.endsWith(school?.suffix)) {
        throw new AppError("Invalid email suffix", 500);
      }
    }
    switch (roles[0]) {
      case "SUPERADMIN":
        rest.roles = inputRoles || [];
        rest.schoolId = inputSchoolId || null;

        console.log("i am inside the superadmin block");
        console.log(rest);
        break;
      case "SCHOOLADMIN":
        rest.roles = ["ADMIN"];
        rest.schoolId = schoolId; // No school assigned initially
        break;
      case "ADMIN":
        rest.roles = ["STUDENT"];
        rest.schoolId = schoolId;
        rest.facultyId = facultyId;
        break;
      default:
        throw new AppError("Invalid role", 500);
    }

    console.log(rest, "-------------------------");

    const isUniqueEmail = await prisma.user.findFirst({
      where: {
        email: rest.email,
      },
    });
    if (isUniqueEmail) {
      throw new AppError("Email is already used", 500);
    }
    const newUser = await prisma.user.create({
      data: rest as Prisma.UserUncheckedCreateInput,
    });

    // Send a welcome email (outside transaction)
    if (newUser?.email) {
      mailer(
        newUser.email,
        "Welcome to the platform",
        generateEmailMarkup({
          email: newUser.email,
          password,
          redirectURL: "http://localhost:3000/signin",
          username: newUser.fullName,
        }),
      );
    }

    return newUser;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

const getUser = async (
  limit?: number,
  page?: number,
  search?: { roles?: string; schoolId?: string },
): Promise<getReturn> => {
  try {
    const pageNum = page ?? 1;
    const size = limit ?? 10;

    const whereCondition: any = {
      isActive: true,
      isArchived: false,
      NOT: {
        roles: {
          has: "SUPERADMIN",
        },
      },
    };

    if (search?.roles) {
      whereCondition.roles = {
        has: search?.roles,
      };
    }

    if (search?.schoolId) {
      whereCondition.schoolId = search?.schoolId;
    }

    console.log(whereCondition);

    // Get total count
    const total = await prisma.user.count({
      where: whereCondition,
    });

    // Fetch paginated data
    const data = await prisma.user.findMany({
      where: whereCondition,
      skip: (pageNum - 1) * size,
      take: size,
    });

    return { data, total, limit: size, page: pageNum };
  } catch (err) {
    throw err;
  }
};
const getStudents = async (
  limit?: number,
  page?: number,
  search?: { facultyId?: string; schoolId?: string },
): Promise<getReturn> => {
  try {
    const pageNum = page ?? 1;
    const size = limit ?? 10;

    const whereCondition: any = {
      isActive: true,
      isArchived: false,
      roles: {
        has: "STUDENT",
      },
    };

    if (search?.schoolId) {
      whereCondition.schoolId = search?.schoolId;
    }
    if (search?.facultyId) {
      whereCondition.facultyId = search?.facultyId;
    }

    console.log(whereCondition);

    // Get total count
    const total = await prisma.user.count({
      where: whereCondition,
    });

    // Fetch paginated data
    const data = await prisma.user.findMany({
      where: whereCondition,
      skip: (pageNum - 1) * size,
      take: size,
    });

    return { data, total, limit: size, page: pageNum };
  } catch (err) {
    throw err;
  }
};

const getById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    throw err;
  }
};

const updateById = async (id: string, payload: Prisma.UserUpdateInput) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    await prisma.user.updateMany({
      // @ts-ignore
      where: {
        roles: {
          has: "ADMIN",
        },
        // @ts-ignore
        facultyId: payload.facultyId,
      },
      data: {
        facultyId: null,
      },
    });

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        fullName: payload?.fullName,
        // @ts-ignore
        facultyId: payload.facultyId,
        // faculty: {
        //   connect: {
        //     // @ts-ignore
        //     id: payload.facultyId,
        //   },
        // },
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const resetPassword = async (id: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    const newPass = await hashPassword(password);

    return await prisma.user.update({
      where: { id },
      data: { password: newPass },
    });
  } catch (err) {
    throw err;
  }
};
const block = async (id: string, isActive: boolean) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    return await prisma.user.update({
      where: { id },
      data: { isActive },
    });
  } catch (err) {
    throw err;
  }
};
const archive = async (id: string, isArchived: boolean) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    return await prisma.user.update({
      where: { id },
      data: { isArchived },
    });
  } catch (err) {
    throw err;
  }
};

const studentProfile = async (id: string) => {
  try {
    console.log(id);
    const findStd = await prisma.user.findFirst({
      where: { id },
      include: {
        attendance: {
          select: {
            id: true,
            isAttended: true,
            event: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        school: {
          select: {
            name: true,
          },
        },
        faculty: {
          select: {
            name: true,
          },
        },
      },
    });
    return findStd;
  } catch (err) {
    throw err;
  }
};
const adminProfile = async (id: string) => {
  try {
    console.log(id);
    const findAd = await prisma.user.findFirst({
      where: { id },
      include: {
        school: {
          select: {
            name: true,
          },
        },
        faculty: {
          select: {
            name: true,
          },
        },
      },
    });
    return findAd;
  } catch (err) {
    throw err;
  }
};

export {
  createUser,
  getUser,
  getById,
  getStudents,
  updateById,
  resetPassword,
  adminProfile,
  block,
  archive,
  studentProfile,
};
