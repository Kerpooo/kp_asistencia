/*
  Warnings:

  - Added the required column `cursoId` to the `Kid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kid" ADD COLUMN     "cursoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
