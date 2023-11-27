/*
  Warnings:

  - You are about to drop the column `userId` on the `Course_Progress` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `Course_Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course_Progress" DROP CONSTRAINT "Course_Progress_userId_fkey";

-- AlterTable
ALTER TABLE "Course_Progress" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Course_Progress" ADD CONSTRAINT "Course_Progress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
