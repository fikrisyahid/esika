/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "User_Role" AS ENUM ('ADMIN', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "User_Role" NOT NULL;
