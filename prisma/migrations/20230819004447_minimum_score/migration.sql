/*
  Warnings:

  - You are about to drop the column `score_to_pass` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "score_to_pass",
ADD COLUMN     "minimum_score" DOUBLE PRECISION;
