/*
  Warnings:

  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Quiz_Result` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Quiz_Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz_Result" DROP CONSTRAINT "Quiz_Result_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userId",
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "userId",
ADD COLUMN     "teacherId" TEXT NOT NULL,
ALTER COLUMN "chapterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quiz_Result" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "quizActiveId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_quizActiveId_fkey" FOREIGN KEY ("quizActiveId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_Result" ADD CONSTRAINT "Quiz_Result_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
