/*
  Warnings:

  - You are about to drop the column `option` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "option",
ADD COLUMN     "options" TEXT[];
