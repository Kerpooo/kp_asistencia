/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Curso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefono]` on the table `Encargado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Encargado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nombre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Encargado" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Kid" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Pagos" ADD COLUMN     "pago" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "fecha_inicio" DROP NOT NULL,
ALTER COLUMN "fecha_fin" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nombre_key" ON "Curso"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Encargado_telefono_key" ON "Encargado"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Encargado_email_key" ON "Encargado"("email");
