import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAllData = async () => {
  try {
    // Delete child records first
    await prisma.attendance.deleteMany();
    await prisma.token.deleteMany();
    await prisma.auth.deleteMany();
    await prisma.event.deleteMany();
    await prisma.faculty.deleteMany();
    await prisma.school.deleteMany(); // Schools depend on Users (schoolAdminId)
    await prisma.user.deleteMany(); // Delete users last

    console.log("All data has been deleted successfully.");
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

deleteAllData().catch((e) => {
  console.error(e);
  process.exit(1);
});
