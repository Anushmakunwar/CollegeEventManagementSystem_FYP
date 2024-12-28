import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/utils/bcrypt";

const prisma = new PrismaClient();

const seed = async () => {
  // Create superadmin
  await prisma.user.create({
    data: {
      fullName: "Super Admin",
      email: "superadmin@example.com",
      password: await hashPassword('supersecurepassword'),
      roles: ['SUPERADMIN'] as Role[], // Superadmin role
      isActive: true,
    },
  });

  console.log("Superadmin created successfully!");

  // Create schools and associated admins
  for (let i = 1; i <= 2; i++) {
    const school = await prisma.school.create({
      data: {
        name: `School ${i}`,
        location: `Location ${i}`,
        suffix: `school${i}.edu.ng`,
        schoolAdmin: {
          create: {
            fullName: `School Admin ${i}`,
            email: `schooladmin${i}@example.com`,
            password: await hashPassword('adminsecurepassword'),
            roles: ['SCHOOLADMIN'] as Role[], // Correct role type
            isActive: true,
          },
        },
      },
    });

    // Create faculties and associated events
    for (let j = 1; j <= 2; j++) {
      const admin = await prisma.user.create({
        data: {
          fullName: `Faculty Admin ${i}${j}`,
          email: `facultyadmin${i}${j}@example.com`,
          password: await hashPassword('facultyadminpassword'),
          roles: ['ADMIN'] as Role[], // Correct role type
          isActive: true,
          schoolId: school.id, // Link the admin to the school
        },
      });

      // Create the faculty first
      const faculty = await prisma.faculty.create({
        data: {
          name: `Faculty ${i}${j}`,
          schools: {
            connect: { id: school.id }, // Correct way to link school to faculty
          },
        },
      });

      // Now create events linked to the faculty
      await prisma.faculty.update({
        where: { id: faculty.id },
        data: {
          events: {
            create: {
              name: `Event for Faculty ${i}${j}`,
              startTime: new Date(),
              endTime: new Date(),
              hostNames: [`Host ${i}${j}`],
              guestNames: [`Guest ${i}${j}`],
              venue: `Venue ${i}${j}`,
              registrationDeadline: new Date(),
              description: `Event Description for Faculty ${i}${j}`,
              date: new Date(),
              scope: 'FACULTY',
              creator: {
                create: {
                  fullName: `Admin for Event ${i}${j}`,
                  email: `admin.event${i}${j}@example.com`,
                  password: await hashPassword('eventadminpassword'),
                  roles: ['ADMIN'] as Role[], // Correct role type
                  isActive: true,
                  facultyId: faculty.id, // Link event admin to the faculty
                  schoolId: school.id,
                },
              },
            },
          },
        },
      });
    }
  }
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
