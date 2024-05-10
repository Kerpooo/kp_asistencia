-- DropForeignKey
ALTER TABLE "Kid" DROP CONSTRAINT "Kid_cursoId_fkey";

-- AlterTable
ALTER TABLE "Kid" ALTER COLUMN "cursoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
