import { type obtenerAsistenciaAlumnos } from "@/server/actions/asistencia"
import { listarCursos, obtenerCurso } from "@/server/actions/curso"
import { type Prisma } from "@prisma/client"

export type AsistenciaType = Prisma.PromiseReturnType<typeof obtenerAsistenciaAlumnos>



//Cursos
export type ListaCursosType = Prisma.PromiseReturnType<typeof listarCursos>
export type CursoType = Prisma.PromiseReturnType<typeof obtenerCurso>