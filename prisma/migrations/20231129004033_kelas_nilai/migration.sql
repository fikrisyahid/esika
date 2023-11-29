-- AlterTable
ALTER TABLE "Nilai" ADD COLUMN     "kelasId" TEXT;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
