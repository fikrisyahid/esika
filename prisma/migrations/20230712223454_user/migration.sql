/*
  Warnings:

  - You are about to drop the column `progress_StudentId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Progress_Student` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_progress_StudentId_fkey";

-- DropForeignKey
ALTER TABLE "Progress_Student" DROP CONSTRAINT "Progress_Student_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Progress_Student" DROP CONSTRAINT "Progress_Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_quizId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "progress_StudentId",
ADD COLUMN     "course_ProgressId" TEXT;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "quizId";

-- DropTable
DROP TABLE "Progress_Student";

-- CreateTable
CREATE TABLE "Quiz_Progress" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "correct" INTEGER NOT NULL,
    "wrong" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course_Progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_Progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_course_ProgressId_fkey" FOREIGN KEY ("course_ProgressId") REFERENCES "Course_Progress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_Progress" ADD CONSTRAINT "Quiz_Progress_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_Progress" ADD CONSTRAINT "Quiz_Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Progress" ADD CONSTRAINT "Course_Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Progress" ADD CONSTRAINT "Course_Progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
