/*
  Warnings:

  - The values [FILL_IN_THE_BLANK] on the enum `Question_Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Question_Type_new" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'VOICE_RECORDING');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "Question_Type_new" USING ("type"::text::"Question_Type_new");
ALTER TYPE "Question_Type" RENAME TO "Question_Type_old";
ALTER TYPE "Question_Type_new" RENAME TO "Question_Type";
DROP TYPE "Question_Type_old";
COMMIT;
