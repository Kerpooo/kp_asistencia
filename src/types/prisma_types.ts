import { type obtenerAsistenciaAlumnos } from "@/server/actions/asistencia"
import type { listarCursos, obtenerCurso } from "@/server/actions/curso"
import type { listarEstudiantes, obtenerEstudiantesCurso, listarKids } from "@/server/actions/kid"
import { type Prisma } from "@prisma/client"
import { type ArrayElement } from "./type"

export type AsistenciaType = Prisma.PromiseReturnType<typeof obtenerAsistenciaAlumnos>

//Cursos
export type ListaCursosType = Prisma.PromiseReturnType<typeof listarCursos>
export type CursoType = Prisma.PromiseReturnType<typeof obtenerCurso>


export type CursoCardType = ArrayElement<NonNullable<ListaCursosType>>
//Kids
export type ListarKidsType = Prisma.PromiseReturnType<typeof listarKids>

//Lista Alumnos
export type ListaAlumnosCurso = Prisma.PromiseReturnType<typeof obtenerEstudiantesCurso>
export type ListaAlumnos = Prisma.PromiseReturnType<typeof listarEstudiantes>
export type AlumnoCurso = ArrayElement<NonNullable<ListaAlumnosCurso>>
export type Alumnos = ArrayElement<NonNullable<ListaAlumnos>>