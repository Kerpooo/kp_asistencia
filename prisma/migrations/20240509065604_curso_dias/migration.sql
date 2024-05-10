/*
  Warnings:

  - You are about to drop the column `dias_semana` on the `Curso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Curso" DROP COLUMN "dias_semana",
ADD COLUMN     "dia_semana" "DIAS"[] DEFAULT ARRAY['LUNES']::"DIAS"[];
