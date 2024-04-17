-- CreateEnum
CREATE TYPE "DIAS" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO');

-- CreateTable
CREATE TABLE "Encargado" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,

    CONSTRAINT "Encargado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kid" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "ano_nacimiento" TIMESTAMP(3) NOT NULL,
    "encargadoId" TEXT NOT NULL,

    CONSTRAINT "Kid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagos" (
    "id" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "cantidad_asistencias" INTEGER NOT NULL,
    "fecha_pago" TIMESTAMP(3) NOT NULL,
    "kidId" TEXT NOT NULL,

    CONSTRAINT "Pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "dia_semana" "DIAS" NOT NULL DEFAULT 'LUNES',

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "kidId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "asistio" BOOLEAN NOT NULL DEFAULT false,
    "hora_toma" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tomada_por" TEXT NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("kidId","cursoId")
);

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_encargadoId_fkey" FOREIGN KEY ("encargadoId") REFERENCES "Encargado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagos" ADD CONSTRAINT "Pagos_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "Kid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "Kid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
