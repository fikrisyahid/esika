-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_dosenId_fkey";

-- DropForeignKey
ALTER TABLE "Dosen" DROP CONSTRAINT "Dosen_userId_fkey";

-- DropForeignKey
ALTER TABLE "Jawaban_Challenge" DROP CONSTRAINT "Jawaban_Challenge_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Jawaban_Tugas" DROP CONSTRAINT "Jawaban_Tugas_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Jawaban_Tugas" DROP CONSTRAINT "Jawaban_Tugas_tugasId_fkey";

-- DropForeignKey
ALTER TABLE "Jawaban_Ujian" DROP CONSTRAINT "Jawaban_Ujian_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Jawaban_Ujian" DROP CONSTRAINT "Jawaban_Ujian_ujianId_fkey";

-- DropForeignKey
ALTER TABLE "Kelas" DROP CONSTRAINT "Kelas_dosenId_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_userId_fkey";

-- DropForeignKey
ALTER TABLE "Materi" DROP CONSTRAINT "Materi_kelasId_fkey";

-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Notifikasi" DROP CONSTRAINT "Notifikasi_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_transaksi_poinId_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi_Poin" DROP CONSTRAINT "Transaksi_Poin_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Tugas" DROP CONSTRAINT "Tugas_kelasId_fkey";

-- DropForeignKey
ALTER TABLE "Ujian" DROP CONSTRAINT "Ujian_kelasId_fkey";

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosen" ADD CONSTRAINT "Dosen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi_Poin" ADD CONSTRAINT "Transaksi_Poin_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_transaksi_poinId_fkey" FOREIGN KEY ("transaksi_poinId") REFERENCES "Transaksi_Poin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "Dosen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materi" ADD CONSTRAINT "Materi_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tugas" ADD CONSTRAINT "Tugas_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban_Tugas" ADD CONSTRAINT "Jawaban_Tugas_tugasId_fkey" FOREIGN KEY ("tugasId") REFERENCES "Tugas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban_Tugas" ADD CONSTRAINT "Jawaban_Tugas_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ujian" ADD CONSTRAINT "Ujian_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban_Ujian" ADD CONSTRAINT "Jawaban_Ujian_ujianId_fkey" FOREIGN KEY ("ujianId") REFERENCES "Ujian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban_Ujian" ADD CONSTRAINT "Jawaban_Ujian_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "Dosen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban_Challenge" ADD CONSTRAINT "Jawaban_Challenge_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
