/*
  Warnings:

  - You are about to drop the column `dia_semana` on the `Curso` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "DIAS" ADD VALUE 'DOMINGO';

-- AlterTable
ALTER TABLE "Curso" DROP COLUMN "dia_semana",
ADD COLUMN     "dias_semana" "DIAS"[] DEFAULT ARRAY['LUNES']::"DIAS"[];
