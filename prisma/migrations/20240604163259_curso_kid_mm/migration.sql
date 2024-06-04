/*
  Warnings:

  - You are about to drop the column `cursoId` on the `Kid` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Kid" DROP CONSTRAINT "Kid_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Kid" DROP COLUMN "cursoId";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "_CursoToKid" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CursoToKid_AB_unique" ON "_CursoToKid"("A", "B");

-- CreateIndex
CREATE INDEX "_CursoToKid_B_index" ON "_CursoToKid"("B");

-- AddForeignKey
ALTER TABLE "_CursoToKid" ADD CONSTRAINT "_CursoToKid_A_fkey" FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToKid" ADD CONSTRAINT "_CursoToKid_B_fkey" FOREIGN KEY ("B") REFERENCES "Kid"("id") ON DELETE CASCADE ON UPDATE CASCADE;
