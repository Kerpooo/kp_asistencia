"use server"

import { type AsistenciaForm } from "@/components/dashboard/asistencia_card/FormAsistencia"
import { prisma } from "@/lib/prisma"
import { getUserSessionServer } from "./user"

export async function listarAsistencia() {

    try {
        const listaAsistencias = await prisma.asistencia.findMany()
        return listaAsistencias
    }
    catch (error) {
        console.error("Error al obtener las listas de asistencia:", error)
        throw error
    }

}


export async function obtenerAsistenciaAlumnos(cursoId: string, fecha: Date) {

    try {
        const asistencia = await prisma.asistencia.findFirst({
            where: {
                cursoId,
                fecha

            },
            include: {
                Asistencia_Alumnos: {
                    include: {
                        kid: {
                            select: {
                                nombre: true,
                                apellido: true
                            }
                        },
                    }

                }
            }
        })

        return asistencia
    }
    catch (error) {
        console.error("Error al obtener la asistencia:", error)
        throw error
    }

}


async function obtenerAsistenciaFechaCurso(cursoId: string, fecha: Date) {

    try {
        const asistencia = await prisma.asistencia.findFirst({
            where: {
                cursoId,
                fecha

            }
        })

        return asistencia
    }
    catch (error) {
        console.error("Error al obtener la asistencia:", error)
        throw error
    }

}


export async function tomaAsistencia({ cursoId, kids, fecha, hora_toma }: AsistenciaForm) {


    const asistenciaExistente = await obtenerAsistenciaFechaCurso(cursoId, fecha)


    // Restricción de cuántas veces se puede tomar la asistencia
    if (asistenciaExistente) {
        throw Error('Ya se tomó la asistencia de este curso en esta fecha')
    }

    // Obtiene la sesión del usuario
    const usuario = await getUserSessionServer()

    try {
        // Crea la nueva asistencia en la base de datos
        const asistencia = await prisma.asistencia.create({
            data: {
                fecha,
                cursoId,
                tomada_por: usuario?.fullName,
                hora_toma,
                Asistencia_Alumnos: {
                    create: kids
                }
            }
        })

        return asistencia
    } catch (error) {
        console.error("Error al tomar la asistencia:", error)
        throw error
    }
}