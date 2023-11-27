/*
  Warnings:

  - You are about to drop the column `course_ProgressId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the `Quiz_Progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_course_ProgressId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz_Progress" DROP CONSTRAINT "Quiz_Progress_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz_Progress" DROP CONSTRAINT "Quiz_Progress_userId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "course_ProgressId";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "quiz_ResultId" TEXT;

-- DropTable
DROP TABLE "Quiz_Progress";

-- CreateTable
CREATE TABLE "_ChapterToCourse_Progress" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChapterToCourse_Progress_AB_unique" ON "_ChapterToCourse_Progress"("A", "B");

-- CreateIndex
CREATE INDEX "_ChapterToCourse_Progress_B_index" ON "_ChapterToCourse_Progress"("B");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_ResultId_fkey" FOREIGN KEY ("quiz_ResultId") REFERENCES "Quiz_Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToCourse_Progress" ADD CONSTRAINT "_ChapterToCourse_Progress_A_fkey" FOREIGN KEY ("A") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToCourse_Progress" ADD CONSTRAINT "_ChapterToCourse_Progress_B_fkey" FOREIGN KEY ("B") REFERENCES "Course_Progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
