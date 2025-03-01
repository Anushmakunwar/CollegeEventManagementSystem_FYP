/*
  Warnings:

  - You are about to drop the column `schoolAdminId` on the `School` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_schoolAdminId_fkey";

-- DropIndex
DROP INDEX "School_schoolAdminId_key";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "schoolAdminId",
ADD COLUMN     "adminId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "School_adminId_key" ON "School"("adminId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
