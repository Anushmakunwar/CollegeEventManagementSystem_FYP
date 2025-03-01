import { Prisma, PrismaClient } from "@prisma/client"; // Importing PrismaClient
import { AppError } from "../../middleware/errorHandler"; // AppError is assumed to be a custom error class
import { getReturn } from "../../types/type";
import { generateQR } from "../../utils/qrcode";
import { sendEventRegistrationEmail } from "../../services/event-register-male";
const prisma = new PrismaClient();

const create = async (
  userId: string,
  roles: string[],
  facultyId: string,
  schoolId: string,
  payload: Prisma.EventCreateInput,
) => {
  try {
    const { ...rest } = payload;
    if (roles.includes("SCHOOLADMIN")) {
      rest.scope = "SCHOOL";
      //@ts-ignore
      rest.school = {
        connect: { id: schoolId },
      };
    } else {
      const isFaculty = await prisma.faculty.findUnique({
        //@ts-ignore
        where: { id: facultyId },
      });
      if (!isFaculty) throw new AppError("Faculty not found", 404);
      rest.scope = "FACULTY";
      //@ts-ignore

      rest.school = {
        connect: { id: schoolId }, // Connect to the existing School by ID
      };
      rest.faculty = {
        connect: { id: facultyId }, // Connect to the existing Faculty by ID
      };
    }
    rest.creator = {
      connect: { id: userId }, // Connect to the existing User by ID
    };
    console.log(rest, "===========");
    rest.date = rest.startTime;
    const result = await prisma.event.create({
      data: rest,
    });
    if (!result) throw new AppError("Error creating event", 500);
    return result;
  } catch (e) {
    throw e;
  }
};
const eventAttendance = async (userId: string, eventId: string) => {
  const findAttendance = await prisma.attendance.findFirst({
    where: { userId, eventId },
  });

  if (!findAttendance) {
    throw new AppError("User has not registered for this event", 401);
  }

  console.log(findAttendance.id);

  const updated = await prisma.attendance.update({
    where: { id: findAttendance.id },
    data: { isAttended: true },
  });
  return updated;
};

const listEvent = async (
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
    const total = await prisma.event.count({
      where: whereCondition,
    });

    // Fetch paginated data
    const data = await prisma.event.findMany({
      where: whereCondition,
      skip: (pageNum - 1) * size,
      take: size,
    });

    return { data, total, limit: size, page: pageNum };
  } catch (err) {
    throw err;
  }
};

// const listEventForStudent = async (
//   schoolId: string,
//   limit?: number,
//   page?: number,
//   search?: { name?: string },
// ): Promise<getReturn> => {
//   try {
//     console.log(search?.name);
//     const pageNum = (page as number) || 1;
//     const size = (limit as number) || 10;

//     const whereCondition: any = {
//       scope: {
//         in: ["SCHOOL", "FACULTY"],
//       },
//       schoolId: schoolId,
//     };
//     if (search?.name) {
//       whereCondition.name = {
//         contains: search.name,
//         mode: "insensitive",
//       };
//     }

//     // Get total count
//     const total = await prisma.event.count({
//       where: whereCondition,
//     });

//     // Fetch paginated data
//     const data = await prisma.event.findMany({
//       where: whereCondition,
//       skip: (pageNum - 1) * size,
//       take: size,
//     });

//     return { data, total, limit: size, page: pageNum };
//   } catch (err) {
//     throw err;
//   }
// };

const listEventForSchoolUser = async (
  schoolId: string,
  facultyId: string,
  roles: string[],
  limit: number = 10,
  page: number = 1,
  search?: { name?: string },
): Promise<getReturn> => {
  try {
    console.log(schoolId, facultyId, roles, limit, page, search, "===");
    // Initialize the base where condition
    const whereCondition: any = { schoolId };

    // Role-based filtering
    if (roles?.includes("SCHOOLADMIN")) {
      whereCondition.scope = { in: ["SCHOOL", "FACULTY"] };
    } else if (roles?.includes("ADMIN")) {
      whereCondition.scope = "FACULTY";
      whereCondition.facultyId = facultyId;
    } else if (roles?.includes("STUDENT")) {
      whereCondition.OR = [
        { scope: "SCHOOL", facultyId: null },
        { scope: "FACULTY", facultyId },
      ];
    }

    // Add search filter if provided
    if (search?.name) {
      whereCondition.name = {
        contains: search.name,
        mode: "insensitive",
      };
    }

    // Fetch total count
    const total = await prisma.event.count({ where: whereCondition });

    // Fetch paginated data
    const data = await prisma.event.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, limit, page };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getById = async (id: string, userId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    const findAttendance = await prisma.attendance.findFirst({
      where: { userId, eventId: id },
    });

    //@ts-ignore
    event.isRegister = findAttendance ? true : false;
    if (!event) throw new AppError("Event not found", 404);
    return event;
  } catch (err) {
    throw err;
  }
};

const update = async (id: string, payload: Prisma.EventUpdateInput) => {
  try {
    const result = await prisma.event.update({
      where: { id },
      data: payload,
    });
    if (!result) throw new AppError("Error updating event", 500);
    return result;
  } catch (e) {
    throw e;
  }
};

const remove = async (id: string) => {
  try {
    const result = await prisma.event.delete({
      where: { id },
    });
    if (!result) throw new AppError("Error deleting event", 500);
    return result;
  } catch (e) {
    throw e;
  }
};
const registerEvent = async (eventId: string, userId: string) => {
  try {
    console.log(userId, "==========================");
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new AppError("Event not found", 404);
    // console.log(event, "=");
    const user = await prisma.user.findUnique({ where: { id: userId } });
    // console.log(user, "==");
    if (!user) throw new AppError("User not found", 404);
    const isRegistered = await prisma.attendance.findFirst({
      where: {
        eventId,
        userId,
      },
    });
    if (isRegistered) throw new AppError("User already registered", 401);
    const result = await prisma.attendance.create({
      data: {
        event: {
          connect: { id: eventId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    // console.log(result, "-========");
    if (!result) throw new AppError("Error registering event", 500);
    const qr = await generateQR(userId, eventId);
    await sendEventRegistrationEmail(user.email, event.name, qr as any);
    return qr;
  } catch (e) {
    throw e;
  }
};
export {
  create,
  listEvent,
  getById,
  update,
  remove,
  registerEvent,
  listEventForSchoolUser,
  eventAttendance,
};
