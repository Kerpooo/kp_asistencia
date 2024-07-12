"use server"
import { type CursoForm } from "@/components/cursos/AddForm"
import { stringToDIAS } from "@/helpers/transformData"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function crearCurso({ nombre, hora_inicio, hora_fin, dias_semana }: CursoForm) {
    const dias_semana_enum = dias_semana.map((dia_semana) => stringToDIAS(dia_semana))

    try {
        const curso = await prisma.curso.create({
            data: {
                nombre,
                hora_inicio: new Date(`2000-12-17T${hora_inicio}`),
                hora_fin: new Date(`2000-12-17T${hora_fin}`),
                dia_semana: dias_semana_enum,
            }
        })
        revalidatePath('/cursos', "page")
        return curso

    } catch (error) {

        console.error("Error al crear el curso:", error);
        throw error;

    }
}


export async function editarCurso(id: string, { nombre, hora_inicio, hora_fin, dias_semana, activo }: CursoForm) {

    const dias_semana_enum = dias_semana.map((dia_semana) => stringToDIAS(dia_semana))

    try {
        const curso = await prisma.curso.update({
            where: {
                id
            },
            data: {
                nombre,
                hora_inicio: new Date(`2000-12-17T${hora_inicio}`),
                hora_fin: new Date(`2000-12-17T${hora_fin}`),
                dia_semana: dias_semana_enum,
                activo
            }
        })
        revalidatePath('/cursos', "page")
        return curso

    } catch (error) {

        console.error("Error al editar el curso:", error)
        throw error

    }
}


export async function obtenerCurso(id: string) {
    try {

        const curso = await prisma.curso.findUnique({ where: { id } })
        return curso

    } catch (error) {

        console.error("Error al obtener el curso:", error)
        throw error

    }
}


export async function listarCursos() {
    try {
        const cursos = await prisma.curso.findMany({
            include: {
                _count: {
                    select: {
                        Kid: true
                    }
                }
            }
        })
        return cursos
    }
    catch (error) {
        console.error("Error al obtener los cursos:", error)
        throw error
    }
}



export async function listarEstudiantesCurso(cursoId: string) {
    try {
        const estudiantes_curso = await prisma.curso.findUnique({
            where: {
                id: cursoId
            },
            include: {
                Kid: true
            }

        })

        return estudiantes_curso?.Kid

    }
    catch (error) {
        console.error("Error al obtener la lista de estudiantes:", error)
        throw error
    }
}



export async function inscribirEstudiantesCurso(cursoId: string, data: Array<{ id: string }>) {
    try {
        const inscribirEstudiante = await prisma.curso.update({
            where: { id: cursoId },
            data: {
                Kid: {
                    connect: data
                }
            }
        })

        revalidatePath(`/cursos/${cursoId}`, "page")
        return inscribirEstudiante



    } catch (error) {

        console.log("Error al inscribir los alumnos", error)
        throw error

    }

}

export async function quitarEstudianteCurso(estudianteId: string, cursoId: string) {
    try {
        const quitarEstudiante = await prisma.curso.update({
            where: { id: cursoId },
            data: {
                Kid: {
                    disconnect: {
                        id: estudianteId
                    }
                }

            }

        })

        revalidatePath(`/cursos/${cursoId}`, "page")
        return quitarEstudiante


    } catch (error) {

        console.log("Error al eliminar alumnos del curso", error)
        throw error

    }
}
