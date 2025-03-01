import { Prisma, PrismaClient } from "@prisma/client"; // Importing PrismaClient
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { getReturn } from "../../types/type";
import { AppError } from "../../middleware/errorHandler";
const prisma = new PrismaClient();

const create = async (
  payload: Prisma.FacultyCreateInput,
  schoolId: string,
): Promise<Prisma.FacultyCreateInput | null> => {
  try {
    const { ...rest } = payload;
    const result = await prisma.faculty.create({
      data: rest,
    });

    await prisma.school.update({
      where: {
        id: schoolId,
      },
      data: {
        faculties: {
          connect: { id: result.id },
        },
      },
    });

    if (!result) throw new AppError("Error creating faculty", 500);
    return result;
  } catch (e) {
    throw e;
  }
};

const listStudentApproval = async (
  limit?: number,
  page?: number,
  // search?: { roles?: string },
  //@ts-ignore
  schoolId: string,
  //@ts-ignore
  facultyId: string,
): Promise<getReturn> => {
  try {
    const pageNum = (page as number) || 1;
    const size = (limit as number) || 10;

    const whereCondition: any = {
      facultyId: facultyId,
      schoolId: schoolId,
      isActive: false,
      isEmailVerified: true,
    };

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
  } catch (e) {
    throw e;
  }
};
const listFaculty = async (
  limit?: number,
  page?: number,
  search?: { name?: string },
  schoolId?: string,
): Promise<getReturn> => {
  try {
    console.log(schoolId);

    const pageNum = (page as number) || 1;
    const size = (limit as number) || 10;

    const whereCondition: any = {
      schools: {
        none: {
          id: schoolId,
        },
      },
    };
    if (search?.name) {
      whereCondition.name = {
        contains: search.name,
        mode: "insensitive",
      };
    }

    // Get total count
    const total = await prisma.faculty.count({
      where: whereCondition,
    });

    // Fetch paginated data
    const data = await prisma.faculty.findMany({
      where: whereCondition,
      include: {
        schools: true,
      },
      skip: (pageNum - 1) * size,
      take: size,
    });

    return { data, total, limit: size, page: pageNum };
  } catch (e) {
    throw e;
  }
};

const getById = async (id: string) => {
  try {
    const faculty = await prisma.faculty.findUnique({ where: { id } });
    if (!faculty) throw new AppError("Faculty not found", 404);
    return faculty;
  } catch (e) {
    throw e;
  }
};
const approveStudent = async (
  id: string,
  status: boolean,
  schoolId: string,
  facultyId: string,
) => {
  try {
    const isUser = await prisma.user.findUnique({ where: { id } });
    if (!isUser) throw new AppError("user not found", 404);
    if (isUser.schoolId !== schoolId && isUser.facultyId !== facultyId) {
      throw new AppError("You are not authorizes faculty member", 404);
      4;
    }
    const result = await prisma.user.update({
      where: { id },
      data: {
        isActive: status,
      },
    });
    if (!result) throw new AppError("Error updating faculty", 500);
    return result;
  } catch (e) {
    throw e;
  }
};
const updateById = async (id: string, payload: Prisma.FacultyUpdateInput) => {
  try {
    const result = await prisma.faculty.update({
      where: { id },
      data: payload,
    });
    if (!result) throw new AppError("Error updating faculty", 500);
    return result;
  } catch (e) {
    throw e;
  }
};

const deleteById = async (id: string) => {
  try {
    const result = await prisma.faculty.delete({ where: { id } });
    if (!result) throw new AppError("Error deleting faculty", 500);
    return result;
  } catch (e) {
    throw e;
  }
};

export {
  create,
  listFaculty,
  getById,
  updateById,
  deleteById,
  listStudentApproval,
  approveStudent,
};
