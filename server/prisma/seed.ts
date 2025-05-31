import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/utils/bcrypt";

const prisma = new PrismaClient();

const seed = async () => {
  // Create superadmin
  await prisma.user.create({
    data: {
      fullName: "Super Admin",
      email: "superadmin@example.com",
      password: await hashPassword("supersecurepassword"),
      roles: ["SUPERADMIN"] as Role[], // Superadmin role
      isActive: true,
      isEmailVerified: true,
    },
  });
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
