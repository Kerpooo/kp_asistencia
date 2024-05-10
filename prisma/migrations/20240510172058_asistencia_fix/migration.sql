/*
  Warnings:

  - The primary key for the `Asistencia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Asistencia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Asistencia" DROP CONSTRAINT "Asistencia_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Asistencia_kidId_cursoId_idx" ON "Asistencia"("kidId", "cursoId");
