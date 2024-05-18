import { listarAsistenciaCursoFecha } from "@/server/actions/asistencia"
import { Prisma } from "@prisma/client"


export type ListaAsistenciaType = Prisma.PromiseReturnType<typeof listarAsistenciaCursoFecha>