"use server"

import { type AsistenciaForm } from "@/components/dashboard/asistencia_card/FormAsistencia"
import { prisma } from "@/lib/prisma"
import { getUserSessionServer } from "./user"
import { format } from "date-fns"
import { obtenerCursoKids } from "./curso"

async function obtenerAsistencia() {

}


export async function listarAsistencia(cursoId?: string, fecha?: Date) {
    try {
        const listaAsistencias = await prisma.asistencia.findMany()
        return listaAsistencias
    }
    catch (error) {
        console.error("Error al obtener las listas de asistencia:", error)
        throw error
    }

}

export async function tomaAsistencia(formData: AsistenciaForm) {

    // NOTE: VALIDA SI YA HAY DATOS CON ESA FECHA HAY CURSO GUARDADOS
    const { fecha: fechaForm, cursoId: cursoIdForm } = formData
    const listaAsistencias = await listarAsistencia()
    const formatFechaForm = format(fechaForm, 'PPP')

    // COMPARA VALORES DE ENTRADA CON LOS VALORES DE CADA UNO DE LOS CURSOS PRESENTES
    const fechaCursoValido = listaAsistencias.map(({ fecha, cursoId }) => {
        const formatFecha = format(fecha, 'PPP')
        return (formatFecha + cursoId === formatFechaForm + cursoIdForm)
    })


    //NOTE: RESTRICCION DE CUANTAS VECES SE PUEDE TOMAR LA ASISTENCIA
    if (!fechaCursoValido.includes(true)) {

        // Obtiene la sesión del usuario
        const userId = await getUserSessionServer()

        // Obtiene la lista de todos los alumnos del curso
        const kidsCurso = await obtenerCursoKids(cursoIdForm)

        //DIFERENCIA DE LOS ALUMNOS QUE ASISTEN Y NO ASISTEN
        const kidsFromCursoSet = new Set(kidsCurso?.Kid.map(({ id }) => id))

        // Copia de la lista de alumnos que asistieron en el formulario
        const kidsListAsistenciaSet = new Set(formData.kids)

        // Calcula la lista de alumnos que no asistieron
        const listaFaltantes = [...kidsFromCursoSet].filter(id => !kidsListAsistenciaSet.has(id))

        // Genera la lista de asistencia
        const LISTA_TOTAL = [
            ...formData.kids.map(id => ({ id, asistio: true })),
            ...listaFaltantes.map(id => ({ id, asistio: false }))
        ]


        const listaAsistencia = LISTA_TOTAL.map(({ id, asistio }) => ({
            kidId: id,
            cursoId: formData.cursoId,
            fecha: formData.fecha,
            asistio,
            hora_toma: formData.hora_toma,
            tomada_por: userId?.email
        }))

        try {
            const asistencia = await prisma.asistencia.createMany({
                data: listaAsistencia

            })

            return asistencia

        } catch (error) {

            console.error("Error al tomar la asistencia:", error);
            throw error;

        }

    }

    throw new Error('Ya se tomo la asistencia de este curso en esta fecha')

}