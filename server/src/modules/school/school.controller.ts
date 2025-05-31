import { Prisma, PrismaClient } from "@prisma/client"; // Importing PrismaClient
import { AppError } from "../../middleware/errorHandler"; // AppError is assumed to be a custom error class
import { getReturn } from "../../types/type";

const prisma = new PrismaClient();

const create = async (payload: Prisma.SchoolCreateInput) => {
  try {
    const isAlreadySchool = await prisma.school.findUnique({
      where: {
        suffix: payload.suffix,
      },
    });
    if (isAlreadySchool) {
      throw new AppError(`${payload.suffix} is already in used!`, 409);
    }
    const result = await prisma.school.create({
      data: payload,
    });
    if (!result) throw new AppError("Error creating school", 500);
    return result;
  } catch (e) {
    throw e;
  }
};

const listSchool = async (
  limit?: number,
  page?: number,
  search?: { name?: string },
): Promise<getReturn> => {
  try {
    console.log(search?.name);
    const pageNum = (page as number) || 1;
    const size = (limit as number) || 10;

    const whereCondition: any = {};
    if (search?.name) {
      whereCondition.name = {
        contains: search.name,
        mode: "insensitive",
      };
    }

    // Get total count
    const total = await prisma.school.count({
      where: whereCondition,
    });

    // Fetch paginated data
    const data = await prisma.school.findMany({
      where: whereCondition,
      skip: (pageNum - 1) * size,
      take: size,
    });

    return { data, total, limit: size, page: pageNum };
  } catch (err) {
    throw err;
  }
};
const getFacultyBySuffix = async (email: string) => {
  const extractEmailSuffix = email.split("@")[1];
  const school = await prisma.school.findUnique({
    where: { suffix: extractEmailSuffix },
    include: {
      faculties: {
        include: {
          users: true,
        },
      },
    },
  });
  if (!school) throw new AppError("School not found", 404);
  //@ts-ignore
  return school.faculties;
};

const getById = async (id: string) => {
  try {
    const school = await prisma.school.findUnique({
      where: { id },
      include: { users: true },
    });
    if (!school) throw new AppError("School not found", 404);
    return school;
  } catch (err) {
    throw err;
  }
};

const assignSchoolAdmin = async (id: string, adminId: string) => {
  try {
    const school = await prisma.school.findUnique({ where: { id } });
    console.log(school, "school");
    if (!school) throw new AppError("School not found", 404);
    if (school?.adminId) {
      const oldAdmin = await prisma.user.findUnique({
        where: { id: school?.adminId },
      });
      await prisma.user.update({
        where: {
          id: oldAdmin?.id,
        },
        data: {
          schoolId: null,
        },
      });
    }
    const isThatAdminUseInOtherSchool = await prisma.school.findFirst({
      where: {
        adminId,
      },
    });
    if (isThatAdminUseInOtherSchool) {
      await prisma.user.update({
        where: {
          //@ts-ignore
          id: isThatAdminUseInOtherSchool.adminId,
        },

        data: {
          schoolId: null,
        },
      });
      await prisma.school.update({
        where: {
          adminId,
        },
        data: {
          adminId: null,
        },
      });
    }
    const result = await prisma.school.update({
      where: { id },
      data: {
        adminId,
      },
    });

    await prisma.user.update({
      where: {
        id: adminId,
      },
      data: {
        schoolId: school.id,
      },
    });

    if (!result) throw new AppError("Error assigning school admin", 500);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateById = async (id: string, payload: Prisma.SchoolUpdateInput) => {
  try {
    //@ts-ignore
    const { facultyId, ...rest } = payload;
    const school = await prisma.school.findUnique({ where: { id } });
    if (!school) throw new AppError("School not found", 404);
    return await prisma.school.update({
      where: {
        id,
      },
      data: {
        ...rest,
        faculties: {
          connect: { id: facultyId }, // Correct way to link school to faculty
        },
      },
    });
  } catch (err) {
    throw err;
  }
};

const deleteById = async (id: string) => {
  try {
    const school = await prisma.school.findUnique({ where: { id } });
    if (!school) throw new AppError("School not found", 404);
    const isUsed = await prisma.user.findFirst({
      where: { schoolId: id },
    });
    if (isUsed) throw new AppError("School is in use", 404);
    return await prisma.school.delete({
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

export {
  create,
  listSchool,
  getById,
  assignSchoolAdmin,
  updateById,
  deleteById,
  getFacultyBySuffix,
};
