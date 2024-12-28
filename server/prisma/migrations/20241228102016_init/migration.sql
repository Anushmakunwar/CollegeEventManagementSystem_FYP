/*
  Warnings:

  - You are about to drop the column `faculty` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `guestName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `hostName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `faculty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scope` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Scope" AS ENUM ('SCHOOL', 'FACULTY');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SCHOOLADMIN';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "faculty",
DROP COLUMN "guestName",
DROP COLUMN "hostName",
ADD COLUMN     "facultyId" TEXT,
ADD COLUMN     "guestNames" TEXT[],
ADD COLUMN     "hostNames" TEXT[],
ADD COLUMN     "scope" "Scope" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "faculty",
ADD COLUMN     "facultyId" TEXT,
ADD COLUMN     "schoolId" TEXT;

-- DropTable
DROP TABLE "auth";

-- DropEnum
DROP TYPE "Faculty";

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolAdminId" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SchoolFaculties" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "School_suffix_key" ON "School"("suffix");

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolAdminId_key" ON "School"("schoolAdminId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_SchoolFaculties_AB_unique" ON "_SchoolFaculties"("A", "B");

-- CreateIndex
CREATE INDEX "_SchoolFaculties_B_index" ON "_SchoolFaculties"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_schoolAdminId_fkey" FOREIGN KEY ("schoolAdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolFaculties" ADD CONSTRAINT "_SchoolFaculties_A_fkey" FOREIGN KEY ("A") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolFaculties" ADD CONSTRAINT "_SchoolFaculties_B_fkey" FOREIGN KEY ("B") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
