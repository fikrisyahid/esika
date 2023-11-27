/*
  Warnings:

  - You are about to drop the column `chapterId` on the `Quiz` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[quizId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_chapterId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "quizId" TEXT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "chapterId";

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_quizId_key" ON "Chapter"("quizId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
