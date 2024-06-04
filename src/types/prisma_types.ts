import { type obtenerAsistenciaAlumnos } from "@/server/actions/asistencia"
import { type listarCursos, type obtenerCurso } from "@/server/actions/curso"
import { type listarKids } from "@/server/actions/kid"
import { type Prisma } from "@prisma/client"

export type AsistenciaType = Prisma.PromiseReturnType<typeof obtenerAsistenciaAlumnos>



//Cursos
export type ListaCursosType = Prisma.PromiseReturnType<typeof listarCursos>
export type CursoType = Prisma.PromiseReturnType<typeof obtenerCurso>

//Kids
export type ListarKidsType = Prisma.PromiseReturnType<typeof listarKids>