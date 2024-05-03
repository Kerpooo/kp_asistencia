"use server"
import { prisma } from "@/lib/prisma";

export async function crearKid(nombre: string, apellido: string, ano_nacimiento: Date, encargadoId: string) {
    try {
        const kid = await prisma.kid.create({
            data: {
                nombre,
                apellido,
                ano_nacimiento,
                encargadoId,
            }
        })

        return kid

    } catch (error) {

        console.error("Error al crear el kid:", error);
        throw error;

    }


}


export async function editarkid(
    id: string,
    nombre: string,
    apellido: string,
    ano_nacimiento: Date,
    encargadoId: string,
    activo: boolean
) {
    try {
        const kid = await prisma.kid.update({
            where: {
                id
            },
            data: {
                nombre,
                apellido,
                ano_nacimiento,
                encargadoId,
                activo
            }
        })

        return kid

    } catch (error) {

        console.error("Error al editar el kid:", error)
        throw error

    }
}


export async function obtenerKid(id: string) {
    try {

        const kid = await prisma.kid.findUnique({ where: { id } })
        return kid

    } catch (error) {

        console.error("Error al obtener el kid:", error)
        throw error

    }

}


export async function listarKids() {
    try {
        const kids = await prisma.kid.findMany()
        return kids
    }
    catch (error) {
        console.error("Error al obtener los kid:", error)
        throw error
    }

}
