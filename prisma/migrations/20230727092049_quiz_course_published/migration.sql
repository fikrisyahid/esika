-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
