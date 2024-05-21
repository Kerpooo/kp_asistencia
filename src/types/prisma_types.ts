import { type obtenerAsistenciaAlumnos } from "@/server/actions/asistencia"
import { type Prisma } from "@prisma/client"

export type AsistenciaType = Prisma.PromiseReturnType<typeof obtenerAsistenciaAlumnos>