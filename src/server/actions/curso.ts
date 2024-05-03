"use server"
import { prisma } from "@/lib/prisma";
import { type DIAS } from "@prisma/client";

export async function crearCurso(nombre: string, hora_inicio: Date, hora_fin: Date, dia_semana: DIAS) {
    try {
        const curso = await prisma.curso.create({
            data: {
                nombre,
                hora_inicio,
                hora_fin,
                dia_semana,
            }
        })

        return curso

    } catch (error) {

        console.error("Error al crear el curso:", error);
        throw error;

    }
}


export async function editarCurso(id: string, nombre: string, hora_inicio: Date, hora_fin: Date, dia_semana: DIAS) {
    try {
        const curso = await prisma.curso.update({
            where: {
                id
            },
            data: {
                nombre,
                hora_inicio,
                hora_fin,
                dia_semana
            }
        })

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
        const cursos = await prisma.curso.findMany()
        return cursos
    }
    catch (error) {
        console.error("Error al obtener los cursos:", error)
        throw error
    }
}
