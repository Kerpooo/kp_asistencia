/*
  Warnings:

  - You are about to drop the column `asistio` on the `Asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `kidId` on the `Asistencia` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asistencia" DROP CONSTRAINT "Asistencia_kidId_fkey";

-- DropIndex
DROP INDEX "Asistencia_kidId_cursoId_idx";

-- AlterTable
ALTER TABLE "Asistencia" DROP COLUMN "asistio",
DROP COLUMN "kidId";

-- CreateTable
CREATE TABLE "Asistencia_Alumno" (
    "id" TEXT NOT NULL,
    "asistenciaId" TEXT NOT NULL,
    "kidId" TEXT NOT NULL,
    "asistio" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Asistencia_Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Asistencia_Alumno_asistenciaId_kidId_idx" ON "Asistencia_Alumno"("asistenciaId", "kidId");

-- AddForeignKey
ALTER TABLE "Asistencia_Alumno" ADD CONSTRAINT "Asistencia_Alumno_asistenciaId_fkey" FOREIGN KEY ("asistenciaId") REFERENCES "Asistencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia_Alumno" ADD CONSTRAINT "Asistencia_Alumno_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "Kid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
