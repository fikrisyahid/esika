/*
  Warnings:

  - You are about to drop the column `quiz_ResultId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `correct` on the `Quiz_Result` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Quiz_Result` table. All the data in the column will be lost.
  - You are about to drop the column `wrong` on the `Quiz_Result` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quiz_ResultId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "quiz_ResultId";

-- AlterTable
ALTER TABLE "Quiz_Result" DROP COLUMN "correct",
DROP COLUMN "score",
DROP COLUMN "wrong";

-- CreateTable
CREATE TABLE "Quiz_Result_Detail" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "quiz_ResultId" TEXT,
    "answer" TEXT[],
    "correct" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_Result_Detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz_Result_Detail" ADD CONSTRAINT "Quiz_Result_Detail_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_Result_Detail" ADD CONSTRAINT "Quiz_Result_Detail_quiz_ResultId_fkey" FOREIGN KEY ("quiz_ResultId") REFERENCES "Quiz_Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;
