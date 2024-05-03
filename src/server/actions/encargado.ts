"use server"
import { prisma } from "@/lib/prisma";

export async function crearEncargado(nombre: string, apellido: string, email: string, telefono: string) {
    try {
        const encargado = await prisma.encargado.create({
            data: {
                nombre,
                apellido,
                email,
                telefono
            }
        })

        return encargado

    } catch (error) {

        console.error("Error al crear el encargado:", error);
        throw error;

    }


}


export async function editarEncargado(id: string, nombre: string, apellido: string, email: string, telefono: string) {
    try {
        const encargado = await prisma.encargado.update({
            where: {
                id
            },
            data: {
                nombre,
                apellido,
                email,
                telefono
            }
        })

        return encargado

    } catch (error) {

        console.error("Error al editar el encargado:", error)
        throw error

    }
}


export async function obtenerEncargado(id: string) {
    try {

        const encargado = await prisma.encargado.findUnique({ where: { id } })
        return encargado

    } catch (error) {

        console.error("Error al obtener el encargado:", error)
        throw error

    }

}


export async function listarEncargados() {
    try {
        const encargados = await prisma.encargado.findMany()
        return encargados
    }
    catch (error) {
        console.error("Error al obtener los encargados:", error)
        throw error
    }

}
