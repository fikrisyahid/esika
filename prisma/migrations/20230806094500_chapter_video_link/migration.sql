/*
  Warnings:

  - You are about to drop the column `video_link` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "video_link" TEXT;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "video_link";
